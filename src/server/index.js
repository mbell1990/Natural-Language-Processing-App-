const dotenv = require("dotenv");
dotenv.config();

const baseURL = "https://api.meaningcloud.com/sentiment-2.1?key=";
const API_KEY = process.env.API_KEY;

const fetch = require("node-fetch");
var path = require("path");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 8081;

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

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://nlp-analyser.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

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
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}`);
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
