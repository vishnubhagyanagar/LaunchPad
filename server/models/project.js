  const mongoose = require("mongoose");

  const Schema = mongoose.Schema({
    startupId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Startup",
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    /*stageOfDevelopment:{
        type:String,
        required:true
      },*/
    targetMarket: {
      type: String,
      required: true,
    },
    businessModel: {
      type: String,
      required: true,
    },
    fundingGoals: {
      type: String,
      required: true,
    },
    useOfFunds: {
      type: String,
      required: true,
    },
    expectedROI: {
      type: String,
      required: true,
    },
    patentDetails: {
      type: String,
      required: true,
    },
    legalDocuments: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      required: true,
    },
  });

  module.exports = mongoose.model("Project", Schema);
