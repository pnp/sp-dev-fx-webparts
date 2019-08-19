export interface IPropertyBagDisplayProps {
  description: string;
  propertiesToDisplay: Array<string>; 
  siteTemplatesToInclude:Array< string>; //STS#1  STS#2 separated by \n  leave off the #1 to get all STS
}