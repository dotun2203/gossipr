const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const MONGO_URI = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const MONGO_URI_PROD = process.env.DATABASE_PRODUCTION.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

function connectToMongo() {
  const mode = process.env.NODE_ENV || "development"; //default if development is not set
  const mongoURI = mode === "development" ? MONGO_URI : MONGO_URI_PROD;

  mongoose.connect(mongoURI).then(
    () => {
      console.log("DB connection successful");
    },
    (err) => {
      console.log(err);
    }
  );
}

module.exports = mongoose;
