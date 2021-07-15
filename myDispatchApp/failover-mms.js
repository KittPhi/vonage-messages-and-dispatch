require("dotenv").config();

const TO_NUMBER = process.env.TO_NUMBER;
const FROM_NUMBER = process.env.FROM_NUMBER;
const IMG_URL = process.env.IMG_URL;

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const APPLICATION_ID = process.env.APPLICATION_ID;
const APPLICATION_PRIVATE_KEY_PATH = process.env.APPLICATION_PRIVATE_KEY_PATH;

const Vonage = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  applicationId: APPLICATION_ID,
  privateKey: APPLICATION_PRIVATE_KEY_PATH,
});

vonage.dispatch.create(
  "failover",
  [
    {
      from: { type: "mms", number: FROM_NUMBER },
      to: { type: "mms", number: TO_NUMBER },
      message: {
        content: {
          type: "image",
          image: { url: IMG_URL },
        },
      },
      failover: {
        expiry_time: 60,
        condition_status: "read",
      },
    },
    {
      from: { type: "sms", number: FROM_NUMBER },
      to: { type: "sms", number: TO_NUMBER },
      message: {
        content: {
          type: "text",
          text: "Dispatch API: Message 2",
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
