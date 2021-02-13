# JIRA DISCORD INTEGRATION

In this repo we are converting `JIRA` events into `DISCORD` message. All this is done with the help of `SERVERLESS` Framework and `AWS LAMDA`. Whenever events occur in JIRA instance, function in AWS LAMDA gets triggered and executed. The purpose of handler function is to convert JIRA event callback which is a JSON into a DISCORD message and send it to a dedicated Discord Channel.

### USAGE

Clone the Repository into your local working directory. Run `npm install`. In this module we tried to keep the code as native as we can without using external dependencies. In the `serverless.yml` configure with your _AWS Profile_ and _Region_ and we are good to go. Then run `serverless package` and `serverless deploy` to get the `API Gateway` endpoints.

We have included `serverless-offline` as a devDependencies to work locally without deploying to `AWS LAMDA`. In the above steps perform `serverless offline` instead of `serverless deploy`.

### WORKING

Firstly, you will need to have your own DISCORD channel to get the messages . you can configure your _incoming-webhook_ in your channel settings and you will provided with the _channel URL_(See https://discord.com/api/webhooks/804317777111111/KKDU7UJy6E7QGmJ4npVlNa8MHP_Xws856Vd-chBVo1Qm8V7gwSuhq). you will need to destructure the URL get the `WEBHOOK` and `SNOWFLAKE`(which are last two parts of the URL) and then insert in your endpoints to do `POST` request. This way eliminates the need for using environment variables. One can easily send the request to your lamda.
