define([], function() {
  return {
    DisclaimerText: `<h2 style="font-size: 20px;margin-top:0px;font-weight:400;">Warning!</h2>
    This web part should ONLY be used to enhance your own custom HTML, such as List Formatting Definitions.<br/><br/>
Misuse of this web part can result in:
<ul>
<li> Loss of styles applied
<li> Broken styles
<li> User calls asking why SharePoint is "Broken"
<li> Tears
<li> Nightmares
<li> Blue Screens of Death
</ul>
Changing the CSS on a SharePoint page is unsupported. If you experience issues, please remove this web part.
<br/><br/>
By dismissing this message or clicking <b>I Accept</b>, you agree that will will use this web part responsibly.
`,
    AcceptDisclaimerButton: "I Accept",
    DismissDisclaimerAriaLabel: "Close and accept responsibility",
    CSSDisclaimer: "You should only change the styles for your own custom CSS classes. Avoid changing global styles.<br/><br/>For more information on how to define custom CSS classes using list formatting, visit: <a href=\"https://aka.ms/list-formatting\" target='_blank'>aka.ms/list-formatting</a>.",
    PlaceholderButtonTitleNoStyles: "Add custom styles",
    PlaceholderButtonTitleHasStyles: "Change custom styles",
    PlaceholderDescriptionNoStyles: "Edit this web part to add custom styles to your page.",
    PlaceholderDescriptionHasStyles: "You are currently applying custom CSS styles to this page",
    PlaceholderIconText: "Inject Custom CSS",
    PropertyPaneDescription: `Use this web part to inject custom CSS to be used with list formatting. Don't worry, this web part is only visible when the page is in Edit mode.`,
    BasicGroupName: "Custom CSS",
    CSSFieldLabel: "Define your custom CSS"
  }
});
