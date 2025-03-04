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


const API_KEY = "057370ebbddbf798e96051f0552c4d7aee61f04005e002aa41f083a5d263a8f3"; // Store API key securely

// app.get("/validate-patent", async (req, res) => {
//   const { patent_id } = req.query;

//   if (!patent_id) {
//     return res.status(400).json({ error: "Patent ID is required" });
//   }

//   const apiUrl = `https://serpapi.com/search.json?engine=google_patents_details&patent_id=${patent_id}&api_key=${API_KEY}`;

//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error(`API Error (Status: ${response.status})`);
//     }

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching patent data:", error.message);
//     res.status(500).json({ error: "Failed to fetch patent data" });
//   }
// });