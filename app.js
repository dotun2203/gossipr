var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

const MONGO_URI = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const MONGO_URI_PROD = process.env.DATABASE_PRODUCTION.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

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

// mongoose.connect(MONGO_URI).then(() => {
//   console.log("DB connection successful");
// });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("welcome to gossip-r");
});

app.use("/api/v1/posts/", postRoutes);
app.use("/api/v1/comments/", commentRoutes);
// app.use("/api/v1/comments/", commentRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
