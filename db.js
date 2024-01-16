const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const MONGO_URI = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(MONGO_URI).then(
  () => {
    console.log("DB connection successful");
  },
  (err) => {
    console.log(err);
  }
);

module.exports = mongoose;
