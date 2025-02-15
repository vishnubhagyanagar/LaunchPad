const mongoose = require("mongoose");

const Schema = mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  typeOfInvestor: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  sectorsOfInterest: {
    type: String,
    required: true,
  },

  stageFocus: {
    type: String,
    required: true,
  },
  preferredBusinessModels: {
    type: String,
    required: true,
  },
  following: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Startup",
    },
  ],

  ticketSize: {
    type: String,
    required: true,
  },
  equityStake: {
    type: String,
    required: true,
  },
  investmentHorizon: {
    type: String,
    required: true,
  },
  trackRecord: {
    type: String,
    required: true,
  },
  sectorExpertise: {
    type: String,
    required: true,
  },
  limitedPartners: {
    type: String,
    required: true,
  },
  geoPreferences: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  //doc Of Accreditation,proof of funds
  createdAt: {
    type: Date,
    required: true,
  },
  /*updatedAt:{
      type:Date,
      required:true
    },*/
});

module.exports = mongoose.model("Investor", Schema);
