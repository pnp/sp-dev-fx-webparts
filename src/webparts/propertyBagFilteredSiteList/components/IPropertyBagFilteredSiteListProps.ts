export interface IPropertyBagFilteredSiteListProps {
  description: string;
  filters: string; // ManagedProprtyName=value , delimeted by \n
  siteTemplatesToInclude: string;// STS#0 delimeted by \n
}
