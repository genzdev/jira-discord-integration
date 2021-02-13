'use strict';

const axios = require('axios');
const messageConverter = require('./message-converter');

module.exports.message = async(event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;
	console.log('handler started --> ', event);

	let WEBHOOK = "", SNOWFLAKE = "";

	if (event.pathParameters) {
		WEBHOOK = (event.pathParameters.webhook) ? event.pathParameters.webhook : null,
		SNOWFLAKE = (event.pathParameters.snowflake) ? event.pathParameters.snowflake : null;
	};

	if (WEBHOOK && SNOWFLAKE) {
		const jiraMessage = JSON.parse(event.body),
			message = messageConverter(jiraMessage);

		var config = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			url: `https://discord.com/api/webhooks/${WEBHOOK}/${SNOWFLAKE}`,
			data: message
		};

		try {
			let res = await axios(config);
			let data = res.data;
			callback(null, {
				statusCode: 200,
				headers: {
					'Content-Type': 'application/json'
				},
				body: 'All good, wasteman!'
			})
			return data;
		} catch (error) {
			console.log(error.response); // this is the main part. Use the response property from the error object
			return error.response;
		}
	} else if (!SNOWFLAKE || !WEBHOOK) {
		callback(null, {
			statusCode: 404,
			headers: {
				'Content-Type': 'text/plain'
			},
			body: 'Snowflake ID or Webhook ID is missing.'
		})
	} else {
		callback(null, {
			statusCode: err.statusCode || 500,
			headers: {
				'Content-Type': 'text/plain'
			},
			body: `Internal Error (something probably went bad or changed at Jira's end).`
		})
	}
};
