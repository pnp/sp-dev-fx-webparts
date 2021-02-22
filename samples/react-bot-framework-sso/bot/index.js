// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const restify = require('restify');
const path = require('path');
const corsMiddleware = require('restify-cors-middleware');
const request = require('request');
const express = require('express');

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const { BotFrameworkAdapter, ConversationState, MemoryStorage, UserState } = require('botbuilder');

const { AuthBot } = require('./bots/authBot');
const { MainDialog } = require('./dialogs/mainDialog');
const { Guid } = require('./util');

// Note: Ensure you have a .env file and include MicrosoftAppId and MicrosoftAppPassword.
// This MicrosoftApp should have OAuth enabled.
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });

// Create the adapter. See https://aka.ms/about-bot-adapter to learn more adapters.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Catch-all for errors.
adapter.onTurnError = async (context, error) => {
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
    // Clear out state
    await conversationState.delete(context);
};

// Define a state store for your bot. See https://aka.ms/about-bot-state to learn more about using MemoryStorage.
// A bot requires a state store to persist the dialog and user state between messages.

// For local development, in-memory storage is used.
// CAUTION: The Memory Storage used here is for local bot debugging only. When the bot
// is restarted, anything stored in memory will be gone.
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

const dialog = new MainDialog();

const bot = new AuthBot(conversationState, userState, dialog);

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
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log(`\n${ server.name } listening to ${ server.url }.`);
    console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async context => {
        await bot.run(context);
    });
});

const GetUserId = (userName) => {
    const userId = userName || Guid.newGuid();
    return userId;
};

server.post('/directline/token', (req, res) => {
    var secret = process.env.DirectLineSecret;
    const authorization = `Bearer ${ secret }`;

    const userId = 'dl_' + GetUserId((req.body || {}).user);

    const options = {
        method: 'POST',
        uri: 'https://directline.botframework.com/v3/directline/tokens/generate',
        body: JSON.stringify({ user: { id: userId } }),
        headers: { Authorization: authorization, 'Content-Type': 'application/json' }
    };

    request.post(options, (error, response, body) => {
        if (!error && response.statusCode < 300) {
            if (body) { res.send(JSON.parse(body)); }
        } else {
            res.status(500).send('Call to retrieve token from DirectLine failed');
        }
    });
});
