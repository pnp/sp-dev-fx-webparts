export interface IPropertyBagFilteredSiteListWebPartProps {
  description: string;
  siteTemplatesToInclude: string; //STS#1  STS#2 separated by \n  leave off the #1 to get all STS
  filters: string; // managedPropertyname=valiust separated by \n (new line)
}
