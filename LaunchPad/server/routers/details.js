const express = require("express");
const Router = express.Router();
const Investor = require("../models/investor");
const Startup = require("../models/startup");

Router.post("/details", async (req, res) => {
  const { id, userType } = req.body;
  try {
    if (userType === "Investor") {
      const investor = await Investor.findById(id).select('fullName _id');
      if (investor) {
        res.status(200).json(investor);
      } else {
        res.status(404).json({ error: "Investor not found" });
      }
    } else if (userType === "Startup") {
      const startup = await Startup.findById(id).select('fullName _id');
      if (startup) {
        res.status(200).json(startup);
      } else {
        res.status(404).json({ error: "Startup not found" });
      }
    } else {
      res.status(400).json({ error: "Invalid userType" });
    }
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = Router;
