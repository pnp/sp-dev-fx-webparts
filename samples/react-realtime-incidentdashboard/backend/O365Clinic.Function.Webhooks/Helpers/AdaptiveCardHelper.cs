using AdaptiveCards.Templating;

using Newtonsoft.Json;
using System;

namespace O365Clinic.Function.Webhooks.Helpers
{
    public class AdaptiveCardHelper
    {
        public static string BindAdaptiveCardData<T>(string adaptiveCardJson, T data)
        {
            if (data == null)
                throw new ArgumentNullException("data");

            var adaptiveCardObject = JsonConvert.DeserializeObject(adaptiveCardJson);

            // Create a Template instance from the template payload
            AdaptiveCardTemplate template = new AdaptiveCardTemplate(adaptiveCardObject);

            // "Expand" the template - this generates the final Adaptive Card payload
            string adaptiveCardPayload = template.Expand(data);
            return adaptiveCardPayload;
        }
        

    }
}
