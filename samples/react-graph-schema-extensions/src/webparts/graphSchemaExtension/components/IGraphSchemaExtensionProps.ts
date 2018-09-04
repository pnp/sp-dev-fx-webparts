import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISalesDataSchemaExtension {
  id: string;
  displayName: string;
  expectedClosedDate?: Date;
  estimatedBudget?: number;
  businessUnit?: string;
}

export interface IGraphSchemaExtensionProps {
  context: WebPartContext;
}

export interface IGraphSchemaExtensionState {
  data: ISalesDataSchemaExtension;
}
