// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as path from 'path';

import { config } from 'dotenv';
const ENV_FILE = path.join(__dirname, '..', '.env');
const settings = config({ path: ENV_FILE });

import * as restify from 'restify';

import * as request from 'request';

import * as express from 'express';

import * as corsMiddleware from 'restify-cors-middleware';

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
import { BotFrameworkAdapter } from 'botbuilder';

// This bot's main dialog.
import { EchoBot } from './bot';

import { Guid } from './util';

// Add '*' origins for test only. You should update with your own origins in production code.
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
});

// Create HTTP server.
const server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.use(express.json());
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Catch-all for errors.
const onTurnErrorHandler = async (context, error) => {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    console.error(`\n [onTurnError] unhandled error: ${ error }`);

    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

// Set the onTurnError for the singleton BotFrameworkAdapter.
adapter.onTurnError = onTurnErrorHandler;

// Create the main dialog.
const myBot = new EchoBot();

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await myBot.run(context);
    });
});

const GetUserId = (userName : string): string => {
    const userId = userName? userName : Guid.newGuid();
    return userId;
};

// Listen for incoming token request.
server.post('/directline/token', (req, res) => {
    const secret = settings.parsed.DirectLineSecret;
    const authorization = `Bearer ${secret}`;

    const userId = 'dl_' + GetUserId((req.body || {}).user);
    const options = {
      method: 'POST',
      uri: 'https://directline.botframework.com/v3/directline/tokens/generate',
      body: JSON.stringify({ user: { id: userId} }),
      headers: { 'Authorization': authorization, 'Content-Type': 'application/json'}
      };

    request.post(options, (error, response, body) => {
        if (!error && response.statusCode < 300) {
            res.status(response.statusCode);
            if (body) { res.send(JSON.parse(body)) }
        } else {
            res.status(500);
            res.send('Call to retrieve token from DirectLine failed');
        }
        res.end();
    });
});

// Listen for Upgrade requests for Streaming.
server.on('upgrade', (req, socket, head) => {
    // Create an adapter scoped to this WebSocket connection to allow storing session data.
    const streamingAdapter = new BotFrameworkAdapter({
        appId: process.env.MicrosoftAppId,
        appPassword: process.env.MicrosoftAppPassword
    });
    // Set onTurnError for the BotFrameworkAdapter created for each connection.
    streamingAdapter.onTurnError = onTurnErrorHandler;

    streamingAdapter.useWebSocket(req, socket, head, async (context) => {
        // After connecting via WebSocket, run this logic for every request sent over
        // the WebSocket connection.
        await myBot.run(context);
    });
});
