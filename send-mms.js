require("dotenv").config({ path: __dirname + "/.env" });

const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;
const VONAGE_APPLICATION_ID = process.env.VONAGE_APPLICATION_ID;
const VONAGE_APPLICATION_PRIVATE_KEY_PATH =
  process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH;

const TO_NUMBER = process.env.TO_NUMBER;
const VIRTUAL_NUMBER = process.env.VIRTUAL_NUMBER;
const IMAGE_URL = process.env.IMAGE_URL;

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
if (!TO_NUMBER || !VIRTUAL_NUMBER || !IMAGE_URL) {
  console.log("TO_NUMBER or WHATSAPP_NUMBER missing or IMAGE_URL");
  process.exit(1);
}

const Vonage = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: VONAGE_API_KEY,
  apiSecret: VONAGE_API_SECRET,
  applicationId: VONAGE_APPLICATION_ID,
  privateKey: VONAGE_APPLICATION_PRIVATE_KEY_PATH,
});

vonage.channel.send(
  { type: "mms", number: TO_NUMBER },
  { type: "mms", number: VIRTUAL_NUMBER },
  {
    content: {
      type: "image",
      image: { url: IMAGE_URL },
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
