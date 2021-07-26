// INSTALL BETA
require("dotenv").config({ path: __dirname + "/.env" });
const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;
const VONAGE_APPLICATION_ID = process.env.VONAGE_APPLICATION_ID;
const VONAGE_APPLICATION_PRIVATE_KEY_PATH =
  process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH;

const TO_NUMBER = process.env.TO_NUMBER;
const FROM_NUMBER = process.env.VIRTUAL_NUMBER;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER;
const FB_SENDER_ID = process.env.FB_SENDER_ID;
const FB_RECIPIENT_ID = process.env.FB_RECIPIENT_ID;
const VIBER_SERVICE_MESSAGE_ID = process.env.VIBER_SERVICE_MESSAGE_ID;

const Vonage = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: VONAGE_API_KEY,
  apiSecret: VONAGE_API_SECRET,
  applicationId: VONAGE_APPLICATION_ID,
  privateKey: VONAGE_APPLICATION_PRIVATE_KEY_PATH,
});

vonage.dispatch.create(
  "failover",
  [
    {
      from: { type: "sms", number: FROM_NUMBER },
      to: { type: "sms", number: TO_NUMBER },
      message: {
        content: {
          type: "text",
          text: "Dispatch API: Message 1",
        },
      },
      failover: {
        expiry_time: 180,
        condition_status: "read",
      },
    },
    {
      from: { type: "whatsapp", number: WHATSAPP_NUMBER },
      to: { type: "whatsapp", number: TO_NUMBER },
      message: {
        content: {
          type: "image",
          image: {
            url: process.env.IMAGE_URL,
          },
        },
      },
      failover: {
        expiry_time: 180,
        condition_status: "read",
      },
    },
    {
      from: { type: "messenger", id: FB_SENDER_ID },
      to: { type: "messenger", id: FB_RECIPIENT_ID },
      message: {
        content: {
          type: "image",
          image: {
            url: process.env.IMAGE_URL,
          },
        },
      },
    },
  ],
  (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data.dispatch_uuid);
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
