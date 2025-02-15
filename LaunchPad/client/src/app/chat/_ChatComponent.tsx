import { RootState } from "@/lib/store";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import './pages.css';

interface EachChatProps {
  chatID: string;
  senderId: string;
  senderModel: string;
  receiverId: string;
  receiverModel: string;
}

interface Message {
  senderId: string;
  senderModel: string;
  receiverId: string;
  receiverModel: string;
  content: string;
  timestamp: Date;
}

const socket = io("http://localhost:8000");

export default function ChatComponent(props: EachChatProps) {
  const authState = useSelector((state: RootState) => state.auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Reference for scrolling

  useEffect(() => {
    fetchChat();
    socket.emit("joinChat", props.chatID);

    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [props.chatID]);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages change
  }, [messages]);

  const fetchChat = async () => {
    if (props.chatID) {
      try {
        const res = await fetch(`http://localhost:8000/chat/getmessages`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ chatId: props.chatID }),
        });
        if (res.ok) {
          const data = await res.json();
          const fetchedMessages = data.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
          fetchedMessages.sort(
            (a: Message, b: Message) => a.timestamp.getTime() - b.timestamp.getTime()
          );
          setMessages(fetchedMessages);
        }
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    }
  };

  const sendMessage = () => {
    if (message.trim()) { // Prevent sending empty messages
      const newMessage = {
        chatID: props.chatID,
        senderId: props.senderId,
        senderModel: props.senderModel,
        receiverId: props.receiverId,
        receiverModel: props.receiverModel,
        content: message,
      };

      socket.emit("sendMessage", newMessage);
      setMessage(""); // Clear the input field
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 bg-darkblue h-full flex flex-col">
      <h1 className="text-black mb-4">Chat</h1>

      {/* Messages container */}
      <div
        className="overflow-y-scroll flex-grow mb-4"
        style={{ maxHeight: "70vh" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === props.senderId ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`px-4 py-2 rounded-md ${
                msg.senderId === props.senderId ? "bg-blue-500" : "bg-gray-500"
              } text-black max-w-xs`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {/* Dummy div to enable scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input and Send button fixed at the bottom */}
      <div className="flex flex-row items-center sticky bottom-0 bg-darkblue p-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key
          placeholder="Type a message"
          className="flex-grow p-2 rounded-md"
          style={{ backgroundColor: "#ffffff", color: "#000" }}
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
