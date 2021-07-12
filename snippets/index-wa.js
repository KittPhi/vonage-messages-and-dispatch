require('dotenv').config();
const Nexmo = require('nexmo');

const nexmo = new Nexmo(
	{
		apiKey: process.env.API_KEY,
		apiSecret: process.env.API_SECRET,
		applicationId: process.env.APPLICATION_ID,
		privateKey: process.env.PRIVATE_KEY_FILE,
	},
	{
		debug: true,
		// use Sandbox endpoint
		apiHost: process.env.API_HOST,
	}
);

console.log(process.env.WHATSAPP_NUMBER);

nexmo.channel.send(
	{
		type: 'whatsapp',
		number: process.env.TO_NUMBER,
	},
	{
		type: 'whatsapp',
		number: process.env.WHATSAPP_NUMBER,
	},
	{
		content: {
			type: 'text',
			text: 'This is a WhatsApp message sent from the Messages API, using the Node.js SDK',
		},
	},
	(err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data.message_uuid);
		}
	}
);
