require("dotenv").config();

const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;
const VONAGE_APPLICATION_ID = process.env.VONAGE_APPLICATION_ID;
const VONAGE_APPLICATION_PRIVATE_KEY_PATH =
  process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH;

const FB_RECIPIENT_ID = process.env.FB_RECIPIENT_ID;
const FB_SENDER_ID = process.env.FB_SENDER_ID;
const BASE_URL = process.env.BASE_URL;

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
  { type: "messenger", id: FB_RECIPIENT_ID },
  { type: "messenger", id: FB_SENDER_ID },
  {
    content: {
      type: "text",
      text: "This is a Facebook Messenger text message sent using the Messages API",
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
