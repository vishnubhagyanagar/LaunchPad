const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companySize: {
    type: Number,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  
  location: {
    type: String,
    required: true,
  },
  
  companyDescription: {
    type: String,
    required: true,
  },
 
  linkedInProfile: {
    type: String,
  },
 
  patentApplicationNumber: {
    type: String,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investor",
    },
  ],

  createdAt: {
    type: Date,
    required: true,
  },
 
});

module.exports = mongoose.model("Startup", Schema);
