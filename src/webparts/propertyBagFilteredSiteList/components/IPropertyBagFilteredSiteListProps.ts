export interface IPropertyBagFilteredSiteListProps {
  description: string;
  filters: string; // ManagedProprtyName=value , delimeted by \n
  siteTemplatesToInclude: string;// STS#0 delimeted by \n
  userFilters: string; // managedPropertyname=valiust separated by \n (new line)// Lets user filters
  showSiteDescriptions: boolean;
  linkTarget: string;
  showQueryText: boolean;

}
