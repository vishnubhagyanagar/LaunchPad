const express = require("express");
const Investor = require("../models/investor");
const Startup = require("../models/startup");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const uid = require("uid");
const jwt = require("jsonwebtoken");
Router.post("/login", async (req, res) => {
  const { email, password, userType } = req.body;
  try {
    if (userType === "Investor") {
      const investor = await Investor.findOne({ email: email });
      if (investor) {
        bcrypt.compare(password, investor.password, (err, valid) => {
          if (err) {
            return res.status(500).json({ error: "Error comparing passwords" });
          }
          if (valid) {
            const token = jwt.sign({ user: investor }, process.env.privatekey, {
              expiresIn: "3h",
            });
            res.status(200).json({
              message: "Login Succesful",
              token: token,
              user: investor,
            });
          }
        });
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    } else if (userType === "Startup") {
      const startup = await Startup.findOne({ email: email });
      if (startup) {
        bcrypt.compare(password, startup.password, (err, valid) => {
          if (err) {
            return res.status(500).json({ error: "Error comparing passwords" });
          }
          if (valid) {
            const token = jwt.sign({ user: startup }, process.env.privatekey, {
              expiresIn: "3h",
            });
            res.status(200).json({
              message: "Login Succesful",
              token: token,
              user: startup,
            });
          }
        });
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    } else {
      res.status(400).json({ error: "Invalid UserType" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.privatekey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Protected route
Router.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

Router.post("/registerinvestor", async (req, res) => {
  const {
    fullName,
          email,
          password,
          phoneNumber,
          typeOfInvestor,
          location,
          sectorsOfInterest,
          stageFocus,
          preferredBusinessModels,
          ticketSize,
          equityStake,
          investmentHorizon,
          trackRecord,
          sectorExpertise,
          limitedPartners,
          geoPreferences,
          availability,
  } = req.body;
  const userExists = await Investor.findOne({
    email: email,
    fullName:fullName,
    phoneNumber: phoneNumber,
  });
  if (!userExists) {
    try {
      const date = Date.now();
      bcrypt.hash(password, 10).then(async (pass) => {
        const investor = new Investor({
          fullName:fullName,
          email: email,
          password: pass,
          phoneNumber: phoneNumber,
          typeOfInvestor:typeOfInvestor,
          location: location,
          sectorsOfInterest:sectorsOfInterest,
          stageFocus:stageFocus,
          preferredBusinessModels:preferredBusinessModels,
          ticketSize:ticketSize,
          equityStake:equityStake,
          investmentHorizon:investmentHorizon,
          trackRecord:trackRecord,
          sectorExpertise:sectorExpertise,
          limitedPartners:limitedPartners,
          geoPreferences:geoPreferences,
          availability:availability,
          createdAt: date,
        });

        await investor.save().then(() => {
          res.status(200).json({ message: "User succesfully created" });
        });
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else {
    res.status(400).json({ error: "User Already Exists" });
  }
});
Router.post("/registerstartup", async (req, res) => {
  const {
    companyName,
          companySize,
          fullName,
          email,
          password,
          phoneNumber,
          industry,
          location,
          companyDescription,
          linkedInProfile,
          patentApplicationNumber,
  } = req.body;
  const userExists = await Startup.findOne({
    email: email,
    fullName: fullName,
    phoneNumber: phoneNumber,
  });
  if (!userExists) {
    try {
      const date = Date.now();
      bcrypt.hash(password, 10).then(async (pass) => {
        const startup = new Startup({
          fullName: fullName,
          email: email,
          password: pass,
          phoneNumber: phoneNumber,
          companyName: companyName,
          patentApplicationNumber: patentApplicationNumber,
          industry: industry,
          location: location,
          companyDescription: companyDescription,
          linkedInProfile: linkedInProfile,
          companySize:companySize,
          createdAt: date,
        });

        await startup.save().then(() => {
          res.status(200).json({ message: "User succesfully created" });
        });
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else {
    res.status(400).json({ error: "User Already Exists" });
  }
});

module.exports = Router;
