export interface IPropertyBagDisplayWebPartProps {
  description: string;
  propertiesToDisplay: string; //separated by \n
  siteTemplatesToInclude: string; //STS#1  STS#2 separated by \n  leave off the #1 to get all STS
}
