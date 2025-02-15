const express = require("express");
const Router = express.Router();
const Chat = require("../models/chat");

Router.post("/getmessages", async (req, res) => {
  const { chatId } = req.body;
  try {
    const chat = await Chat.findOne({ chatID: chatId });
    if (chat) {
      res.status(200).send(chat);
    } else {
      res.status(404).json("Cannot find chat");
    }
  } catch (e) {
    res.status(500).json({ error: "Server error" });
    console.log(e);
  }
});

Router.post("/updateMessages", async (req, res) => {
  const { chatID, senderId, receiverId, content, senderModel, receiverModel } =
    req.body;
  try {
    const chat = await Chat.findOne({ chatID:chatID });

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
      const newchat = new Chat({ chatID: chatID, messages: [message] });
      await newchat.save();
    }
  
  } catch (e) {
    res.status(500).json({ error: "Server error" });
    console.log(e);
  }
});

module.exports = Router;
