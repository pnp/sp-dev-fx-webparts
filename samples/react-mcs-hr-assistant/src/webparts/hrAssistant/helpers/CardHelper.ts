export class CardHelper {
  // A utility function that extracts the OAuthCard resource URI from the incoming activity or return undefined
  public static getOAuthCardResourceUri(activity: any): string | undefined {
    const attachment = activity?.attachments?.[0];
    if (attachment?.contentType === 'application/vnd.microsoft.card.oauth' && attachment.content.tokenExchangeResource) {
      return attachment.content.tokenExchangeResource.uri;
    }
  }

  // Function to extract user initials from display name
  public static getUserInitials = (text: string): string => {
    if (text) {
      const initials = text.match(/\b\w/g) || [];
      text = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }
    return text;
  };

}