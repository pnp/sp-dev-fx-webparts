// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');
const { ComponentDialog } = require('botbuilder-dialogs');

class LogoutDialog extends ComponentDialog {
    async onBeginDialog(innerDc, options) {
        const result = await this.interrupt(innerDc);
        if (result) {
            return result;
        }

        return await super.onBeginDialog(innerDc, options);
    }

    async onContinueDialog(innerDc) {
        const result = await this.interrupt(innerDc);
        if (result) {
            return result;
        }

        return await super.onContinueDialog(innerDc);
    }

    async interrupt(innerDc) {
        if (innerDc.context.activity.type === ActivityTypes.Message) {
            const text = innerDc.context.activity.text ? innerDc.context.activity.text.toLowerCase() : '';
            if (text === 'logout') {
                // When the user sends the 'logout' command to the bot, we are going to send a 'oauth/signout'
                // to the client application which will prompt the app to log the user out and send a 'oauth/signout'
                // to the bot. When the bot receives the 'oauth/signout' event it will log the user out from the onEvent
                // handler
                await innerDc.context.sendActivity({ type: 'event', name: 'oauth/signout' });
                await innerDc.context.adapter.signOutUser(innerDc.context, process.env.ConnectionName);
                await innerDc.context.sendActivity('You have been signed out.');
            }
        }
    }
}

module.exports.LogoutDialog = LogoutDialog;
