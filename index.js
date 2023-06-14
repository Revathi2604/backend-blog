//---- step : 1.1
const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
app.use(
  cors({
    orgin: "*",
  })
);
//---- step : 3
const multer = require("multer");
const path = require("path");

//---- step : 2.1
const authRoute = require("./routes/auth");
const authUser = require("./routes/user");
const authPost = require("./routes/posts");
const authCat = require("./routes/categories");

//---- step : 1
dotenv.config();
//---- step : 2.2
app.use(express.json());
//---- step : 2.3 last ma file crate garne time
app.use("/images", express.static(path.join(__dirname, "/images")));

//---- step : 1.3

var mongoURL = process.env.CONNECTION_URL;
mongoose.set("strictQuery", false);
mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB connection failed");
});

connection.on("connected", () => {
  console.log("Mongo DB connection successful");
});

//---- step : 3
const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "images");
  },
  filename: (req, file, callb) => {
    callb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//---- step : 2
app.use("/auth", authRoute);
app.use("/users", authUser);
app.use("/posts", authPost);
app.use("/category", authCat);

//---- step : 1.2
app.listen("7532", () => {
  console.log("backend running...");
});
