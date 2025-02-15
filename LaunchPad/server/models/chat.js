const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  senderModel: {
    type: String,
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  receiverModel: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new Schema(
  {
    chatID: {
      type: String,
      required: true,
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
