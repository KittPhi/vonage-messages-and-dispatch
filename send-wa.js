require("dotenv").config();
const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;
const VONAGE_APPLICATION_ID = process.env.VONAGE_APPLICATION_ID;
const VONAGE_APPLICATION_PRIVATE_KEY_PATH =
  process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH;

const TO_NUMBER = process.env.TO_NUMBER;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER;
const BASE_URL = process.env.BASE_URL;

if (!VONAGE_API_KEY || !VONAGE_API_SECRET) {
  console.log("VONAGE_API_KEY or VONAGE_API_SECRET missing");
  process.exit(1);
}
if (!VONAGE_APPLICATION_ID || !VONAGE_APPLICATION_PRIVATE_KEY_PATH) {
  console.log(
    "VONAGE_APPLICATION_ID or VONAGE_APPLICATION_PRIVATE_KEY_PATH missing"
  );
  process.exit(1);
}
if (!TO_NUMBER || !WHATSAPP_NUMBER) {
  console.log("TO_NUMBER or WHATSAPP_NUMBER missing");
  process.exit(1);
}

const Vonage = require("@vonage/server-sdk");
const vonage = new Vonage(
  {
    apiKey: VONAGE_API_KEY,
    apiSecret: VONAGE_API_SECRET,
    applicationId: VONAGE_APPLICATION_ID,
    privateKey: VONAGE_APPLICATION_PRIVATE_KEY_PATH,
  },
  {
    apiHost: BASE_URL,
  }
);

vonage.channel.send(
  { type: "whatsapp", number: TO_NUMBER },
  { type: "whatsapp", number: WHATSAPP_NUMBER },
  {
    content: {
      type: "text",
      text: "This is a WhatsApp Message text message sent using the Messages API",
    },
  },
  (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data.message_uuid);
    }
  }
);

const express = require("express");
const app = express();
// app.use(express.static("public"));
var path = require("path");
const bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/webhooks/inbound", (req, res) => {
  console.log("/inbound", req.body);
  res.status(200).end();
});

app.post("/webhooks/status", (req, res) => {
  console.log("/status", req.body);
  res.status(200).end();
});

app.listen(3000);
