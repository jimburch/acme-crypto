require('dotenv').config();
const { App } = require('@slack/bolt');

const { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, APP_TOKEN } = process.env;

const app = new App({
	token: SLACK_BOT_TOKEN,
	signingSecret: SLACK_SIGNING_SECRET,
	appToken: APP_TOKEN,
	socketMode: true,
});

app.command('/hellothere', async ({ command, ack, say }) => {
	try {
		await ack();
		await say('General Kenobi!');
	} catch (err) {
		console.error(err);
	}
});

app.message(':wave:', async ({ message, say }) => {
	try {
		await say('Hello there');
	} catch (err) {
		console.error(err);
	}
});

app.message('hello', async ({ message, say }) => {
	await say({
		blocks: [
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: `Hey there <@${message.user}>!`,
				},
				accessory: {
					type: 'button',
					text: {
						type: 'plain_text',
						text: 'Click Me',
					},
					action_id: 'button_click',
				},
			},
		],
		text: `Hey there <@${message.user}>!`,
	});
});

app.action('button_click', async ({ body, ack, say }) => {
	await ack();
	await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
	const port = 3000;
	// Start your app
	await app.start(process.env.PORT || port);
	console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
