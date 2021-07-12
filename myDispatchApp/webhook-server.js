require("dotenv").config({ path: __dirname + "/.env" });
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const APPLICATION_ID = process.env.APPLICATION_ID;
const APPLICATION_PRIVATE_KEY_PATH =
  __dirname + "/./" + process.env.APPLICATION_PRIVATE_KEY_PATH;
const TO_NUMBER = process.env.TO_NUMBER;
const VIRTUAL_NUMBER = process.env.VIRTUAL_NUMBER;

if (!API_KEY || !API_SECRET) {
  console.log("API_KEY or API_SECRET missing");
  process.exit(1);
}
if (!APPLICATION_ID || !APPLICATION_PRIVATE_KEY_PATH) {
  console.log("APPLICATION_ID or APPLICATION_PRIVATE_KEY_PATH missing");
  process.exit(1);
}
if (!TO_NUMBER || !VIRTUAL_NUMBER) {
  console.log("TO_NUMBER or VIRTUAL_NUMBER missing");
  process.exit(1);
}

const Vonage = require("@vonage/server-sdk");
const vonage = new Vonage({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  applicationId: APPLICATION_ID,
  privateKey: APPLICATION_PRIVATE_KEY_PATH,
});
const express = require("express");
const app = express();
// app.use(express.static("public"));
var path = require("path");
app.use(express.static(path.join(__dirname, "public")));
const bodyParser = require("body-parser");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/inbound", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.post("/status", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.listen(3000);
