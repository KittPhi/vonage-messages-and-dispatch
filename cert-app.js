var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000);

app.get("/", (req, res) => {
  res.json(200);
});

app.post("/webhooks/inbound-message", (req, res) => {
  console.log("inbound:", req.body);
  res.status(200).end();
});

app.post("/webhooks/message-status", (req, res) => {
  // console.log("status:", req.body);
  res.status(200).end();
});

// run `cert-app.js` to allow Vonage Server to let us know when VIRTUAL_NUMBER
// has incoming message.

// run `send-sms.js` to send a message from VIRTUAL_NUMBER -> TO_NUMBER (my cell)
