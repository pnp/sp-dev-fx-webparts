using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.Bot.Connector;
using Newtonsoft.Json;

namespace Simple_Bot_Application
{
    [BotAuthentication]
    public class MessagesController : ApiController
    {
        /// <summary>
        /// POST: api/Messages
        /// Receive a message from a user and reply to it
        /// </summary>
        public async Task<HttpResponseMessage> Post([FromBody]Activity activity)
        {
            if (activity.Type == ActivityTypes.Message)
            {
                ConnectorClient connector = new ConnectorClient(new Uri(activity.ServiceUrl));
                // calculate something for us to return
                int length = (activity.Text ?? string.Empty).Length;

                // Get randomg string reply for the conversation
                string responseString = GetRandomResponseString();

                // return our reply to the user
                Activity reply = activity.CreateReply(responseString);
                await connector.Conversations.ReplyToActivityAsync(reply);
            }
            else
            {
                HandleSystemMessage(activity);
            }
            var response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }

        /// <summary>
        /// Get random string response, which will be returned for the caller.
        /// </summary>
        /// <returns></returns>
        private string GetRandomResponseString()
        {
            string[] messages = new[] {
                "Totally approves",
                "+1",
                "Was wondering about the same",
                "That's interesting, tell me more",
                "What's the status?",
                "I just ping'd you also in email - can you reply on that",
                "I have a question for your",
                "Sounds good, but I have few questions on Sandbox solutions",
                "Sorry - was sleeping, can you repeat that?",
                "What What What",
                "Excuse me, who are you?",
                "Yes", "Yo", "Cool", "Sure, sounds cool",
                "You have a second for quick question?",
                "How are you?", "Do you have 5 minutes?",
                "Ask from Paolo, he knows everything",
                "Was looking for answers, not questions",
                "42 is the answer",
                "Do you like hats?",
                "I'd like to have a dog - a puppy - can you help me?"
            };

            return messages[new Random().Next(messages.Length)];
        }

        private Activity HandleSystemMessage(Activity message)
        {
            if (message.Type == ActivityTypes.DeleteUserData)
            {
                // Implement user deletion here
                // If we handle user deletion, return a real message
            }
            else if (message.Type == ActivityTypes.ConversationUpdate)
            {
                // Handle conversation state changes, like members being added and removed
                // Use Activity.MembersAdded and Activity.MembersRemoved and Activity.Action for info
                // Not available in all channels
            }
            else if (message.Type == ActivityTypes.ContactRelationUpdate)
            {
                // Handle add/remove from contact lists
                // Activity.From + Activity.Action represent what happened
            }
            else if (message.Type == ActivityTypes.Typing)
            {
                // Handle knowing tha the user is typing
            }
            else if (message.Type == ActivityTypes.Ping)
            {
            }

            return null;
        }
    }
}