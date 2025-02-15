require("../server/MongoDbConnection");
const Auth = require("../server/routers/auth");
const Project = require("../server/routers/startupproject");
const Follow = require("../server/routers/followrouter");
const Details = require("../server/routers/details");
const Chat = require("../server/routers/chatmiddleware");
const Patent=require("../server/routers/patent");
const Chatmodel = require("../server/models/chat");
const Search=require("../server/routers/search");
const express = require("express");
require("dotenv").config();
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const socketio = require("socket.io");

app.use(cors({
  origin: "http://localhost:3000", // Fix CORS issue
  methods: ["GET", "POST"],
}));
app.use(bodyparser.json());

const server = createServer(app);

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000", // Fix CORS issue
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinChat", (chatID) => {
    socket.join(chatID);
    console.log(`User joined chat: ${chatID}`);
  });

  socket.on("sendMessage", async (messageData) => {
    const {
      chatID,
      senderId,
      receiverId,
      content,
      senderModel,
      receiverModel,
    } = messageData;

    try {
      let chat = await Chatmodel.findOne({ chatID });

      const message = {
        senderId,
        senderModel,
        receiverId,
        receiverModel,
        content,
      };

      if (chat) {
        chat.messages.push(message);
        await chat.save();
      } else {
        chat = new Chatmodel({ chatID, messages: [message] });
        await chat.save();
      }

      io.to(chatID).emit("receiveMessage", message);
    } catch (e) {
      console.error("Error saving message:", e);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(8000, () => console.log("Server running on 8000"));

//app routes
app.use("/auth", Auth);
app.use("/post", Project);
app.use("/follow", Follow);
app.use("/details", Details);
app.use("/chat", Chat);
app.use("/patent",Patent);
app.use("/search",Search);