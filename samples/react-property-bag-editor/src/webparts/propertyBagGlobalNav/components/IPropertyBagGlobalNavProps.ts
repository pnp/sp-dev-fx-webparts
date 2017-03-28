export interface IPropertyBagGlobalNavProps {
  description: string;

  siteTemplatesToInclude: Array<string>; //STS#1  STS#2  leave off the #1 to get all STS
  filters: Array<string>; // managedPropertyname=valiust separated by \n (new line)
  managedProperties: Array<string>;// managed properties to build the menu from.
}
