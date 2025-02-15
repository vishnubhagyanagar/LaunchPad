const express = require("express");
const Router = express.Router();
const Project = require("../models/project");
const mongoose = require("mongoose");

Router.post("/project", async (req, res) => {
  const {
    startupId,
    projectTitle,
    projectDescription,
    targetMarket,
    businessModel,
    fundingGoals,
    useOfFunds,
    expectedROI,
    patentDetails,
    legalDocuments,
  } = req.body;
  try {
    const date = Date.now();
    const project = await Project({
      startupId: new mongoose.Types.ObjectId(startupId),
      projectTitle: projectTitle,
      projectDescription: projectDescription,
      targetMarket: targetMarket,
      businessModel: businessModel,
      fundingGoals: fundingGoals,
      useOfFunds: useOfFunds,
      expectedROI: expectedROI,
      patentDetails: patentDetails,
      legalDocuments: legalDocuments,
      createdAt: date,
    });
    const result = await project.save();
    res.status(200).send("project uploaded successfully");
  } catch (e) {
    console.error(e);

    res.status(400).send("project not uploaded successfully");
  }
});

Router.get("/allprojects", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (e) {
    res.json(JSON.stringify(e));
  }
});

module.exports = Router;
