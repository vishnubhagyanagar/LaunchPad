const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  investorId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Investor",
  },
  startupId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Startup",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FollowRequest", Schema);
