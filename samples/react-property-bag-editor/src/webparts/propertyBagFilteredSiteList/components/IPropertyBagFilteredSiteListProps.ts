export interface IPropertyBagFilteredSiteListProps {
  description: string;
  filters: Array<string>; // ManagedProprtyName=value , delimeted by \n
  siteTemplatesToInclude: Array<string>;// STS#0 delimeted by \n
  userFilters: Array<string>; // managedPropertyname=valiust separated by \n (new line)// Lets user filters
  showSiteDescriptions: boolean;
  linkTarget: string;
  showQueryText: boolean;

}
