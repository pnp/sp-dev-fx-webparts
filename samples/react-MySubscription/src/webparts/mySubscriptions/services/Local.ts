declare interface IMySubscriptionsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  SubscribeLabel: string;
  SubscriptionSuccessMsg:string;
  UnsubscribedSuccessMsg:string;
  ErrorMessage1:string;
  PleaseWait:string;
}

export class getLanguage {
  public static async getUserBrowserLanguage(): Promise<any> {
    debugger;
    switch (navigator.language) {
      case "en":
        return {
          SubscribeLabel: "Subscribe",
          SubscribedLabel: "Subscribed",
          SubscriptionSuccessMsg:"Thank you, you have subscribed to: ",
          UnsubscribedSuccessMsg:"Thank you, you have unsubscribed to: ",
          ErrorMessage1:"Something went wrong when performing the operation.Please close the browser and try again.",
          PleaseWait:"Please wait, while we load subscriptions for you ..."
        };
        break;
      case "no":
        return {
          SubscribeLabel: "Abonner", 

          SubscribedLabel: "Abonnerer",
          SubscriptionSuccessMsg:"Takk, du har abonnert på: ",
          UnsubscribedSuccessMsg:"Takk, du er fjernet fra abonnementet: ",
          ErrorMessage1:"Noe gikk galt da du utførte operasjonen. Lukk nettleseren og prøv igjen.",
          PleaseWait:"Vent, mens vi laster abonnement for deg ..."  
          
        };
        break;
      default:
        return {
          SubscribeLabel: "Subscribe",
          SubscribedLabel: "Subscribed",
          SubscriptionSuccessMsg:"Thank you, you have subscribed to: ",
          UnsubscribedSuccessMsg:"Thank you, you have unsubscribed to: ",
          ErrorMessage1:"Something went wrong when performing the operation.Please close the browser and try again.",
          PleaseWait:"Please wait, while we load subscriptions for you ..."  
        };
    }
  }
}
