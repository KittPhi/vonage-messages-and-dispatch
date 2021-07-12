# [Message API Certification Project](https://vonage-workshop.nexmodev.com/messages/certification/)

Project Objective:

You have learned how to send messages with the Messages API, but now you need to include the Dispatch API so that you can fail over from one channel to another!

Your job is to create an application that notifies your customer that their package will be delivered tomorrow.

Initially, you will attempt to contact them using a plain SMS message.

If that fails to elicit a response (and, for the purposes of this exercise let’s assume that you’ll wait 180 seconds), you should failover to either a second (but different) SMS message or a Facebook Messenger message containing an image.

You don’t need to worry about inbound messages - let’s just assume that your user is unresponsive.

## Setup:

Create new Application at dashboard, enable messages, generate key, then save the `private.key` to this directory `mycertapp`.

At terminal, run `ngrok http 3000`. Then back at the Application inside the Dashboard, Replace `NGROK_URL` with below:

INBOUND URL
https://NGROK_URL/inbound
STATUS URL
https://NGROK_URL/status

## To run the Demo App:

```js
cd myDispatchApp
// install node dependencies
npm install
// Rename `ExampleENV` file to `.env` and then populate it with your Vonage Credentials and Application ID.
mv ExampleENV .env
// Run the app
nodemon app.js
```
