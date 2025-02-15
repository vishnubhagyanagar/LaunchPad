const mongoose = require("mongoose");
require('dotenv').config();
module.exports= mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("Error" + e));


