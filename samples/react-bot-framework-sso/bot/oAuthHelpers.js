// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { AttachmentLayoutTypes, CardFactory } = require('botbuilder');
const { SimpleGraphClient } = require('./simple-graph-client');

/**
 * These methods call the Microsoft Graph API. The following OAuth scopes are used:
 * 'OpenId' 'email' 'Mail.Send.Shared' 'Mail.Read' 'profile' 'User.Read' 'User.ReadBasic.All'
 * for more information about scopes see:
 * https://developer.microsoft.com/en-us/graph/docs/concepts/permissions_reference
 */
class OAuthHelpers {
    /**
   * Displays information about the user in the bot.
   * @param {TurnContext} context A TurnContext instance containing all the data needed for processing this conversation turn.
   * @param {TokenResponse} tokenResponse A response that includes a user token.
   */
    static async listMe(context, tokenResponse) {
        if (!context) {
            throw new Error('OAuthHelpers.listMe(): `context` cannot be undefined.');
        }
        if (!tokenResponse) {
            throw new Error('OAuthHelpers.listMe(): `tokenResponse` cannot be undefined.');
        }

        // Pull in the data from Microsoft Graph.
        const client = new SimpleGraphClient(tokenResponse.token);
        const { displayName } = await client.getMe();

        await context.sendActivity(`Welcome ${ displayName }. Glad to meet you! You are now logged in.`);
    }
}

exports.OAuthHelpers = OAuthHelpers;
