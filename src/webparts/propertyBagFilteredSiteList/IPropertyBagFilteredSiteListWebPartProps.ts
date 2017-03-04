export interface IPropertyBagFilteredSiteListWebPartProps {
  description: string;
  siteTemplatesToInclude: string; //STS#1  STS#2 separated by \n  leave off the #1 to get all STS
  filters: string; // managedPropertyname=valiust separated by \n (new line)
  userFilters: string; // managedPropertyname=valiust separated by \n (new line)// Lets user filters
  showSiteDescriptions: boolean;
  linkTarget: string;// open sites in new window?
  showQueryText: boolean; // display querytext in a messagegDisplay(Used for debugging)
}
