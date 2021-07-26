// Sends SMS from VIRTUAL_NUMBER -> TO_NUMBER (my cell)
require("dotenv").config({ path: __dirname + "/.env" });

const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;
const VONAGE_APPLICATION_ID = process.env.VONAGE_APPLICATION_ID;
const VONAGE_APPLICATION_PRIVATE_KEY_PATH =
  process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH;

const TO_NUMBER = process.env.TO_NUMBER;
const FROM_NUMBER = process.env.VIRTUAL_NUMBER;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER;
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
        expiry_time: 60,
        condition_status: "read",
      },
    },
    {
      from: { type: "sms", number: FROM_NUMBER },
      to: { type: "sms", number: "15753226206" },
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
