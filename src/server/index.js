const dotenv = require("dotenv");
dotenv.config();

const baseURL = "https://api.meaningcloud.com/sentiment-2.1?key=";
const API_KEY = process.env.API_KEY;

const fetch = require("node-fetch");
var path = require("path");
const express = require("express");

const app = express();

//const PORT = process.env.PORT || 8081;

const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { response } = require("express");
app.use(cors());

app.use(express.static("dist"));

console.log(__dirname);

// get request

// app.get("/", function (req, res) {
//   res.sendFile("dist/index.html");
//   res.sendFile(path.resolve("src/client/views/index.html"));
// });

//test for render

app.get("/", function (req, res) {
  const filePath = path.resolve(__dirname, "../client/views/index.html");
  res.sendFile(filePath);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log(`Example app listening on port 8081`);
});

// app.get("/", function (req, res) {
// res.send(mockAPIResponse);
// });

// Post route to recieve request  - set up post in client using fetch to send data to this post
// request holds all data that is involved in request
// response used to send things back to the client

app.post("/api", async (req, res) => {
  console.log(req.body);
  const response = await fetch(
    `${baseURL}${API_KEY}&of=json&lang=en&model=general&url=${req.body.url}`
  );
  try {
    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});
