"use client";
import { RootState } from "@/lib/store";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import ChatComponent from "./_ChatComponent";

export default function Page() {
  const authState = useSelector((state: RootState) => state.auth);
  const [followers, setFollowers] = useState<Followers[]>([]);
  const hasFetchedData = useRef(false);
  const [selected, setSelected] = useState<string>("");

  interface Followers {
    id: string;
    name: string;
  }

  useEffect(() => {
    if (authState.user && !hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }
  }, [authState]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/follow/getFollowers`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: authState.user!._id,
          userType: authState.userType,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const newFollowers: Followers[] = await Promise.all(
          data.map(async (element: string) => {
            try {
              const res = await fetch(`http://localhost:8000/details/details`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                  id: element,
                  userType:
                    authState.userType === "Investor" ? "Startup" : "Investor",
                }),
              });

              if (res.ok) {
                const data1 = await res.json();
               
                return { id: data1._id, name: data1.fullName };
              } else {
                console.error(`Failed to fetch details for id: ${element}`);
                return null;
              }
            } catch (error) {
              console.error(`Error fetching details for id: ${element}`, error);
              return null;
            }
          })
        );

        setFollowers(newFollowers.filter(Boolean) as Followers[]);
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  return (
    <div className="bg-darkblue w-full h-full">
    <div className="flex flex-row h-full gap-3">
      <div className="flex flex-col w-48 border-r-2 border-gray-700 h-full bg-lightblue text-black">
        <h2 className="px-3 py-2">Chatnames</h2>
        {followers.map((follower) => (
          <div
            key={follower.id}
            onClick={() => {
              setSelected(follower.id);
            }}
            className="flex items-center gap-3 rounded-md bg-muted px-3 py-2 text-primary transition-colors hover:bg-lightgray hover:shadow-lg cursor-pointer"
          >
            <div className="flex-1 truncate">
              <div className="font-medium text-black">{follower.name}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full h-full">
        {selected === "" ? (
          <div className="text-center text-black mt-10">Let's Start Socializing!!</div>
        ) : authState.userType === "Investor" ? (
          <ChatComponent
            chatID={`${authState.user!._id}_${selected}`}
            senderId={authState.user!._id}
            senderModel="Investor"
            receiverId={selected}
            receiverModel="Startup"
          />
        ) : (
          <ChatComponent
            chatID={`${selected}_${authState.user!._id}`}
            senderId={authState.user!._id}
            senderModel="Startup"
            receiverId={selected}
            receiverModel="Investor"
          />
        )}
      </div>
    </div>
  </div>
  );
}
