import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

import { PeoplePickerEntity } from '@pnp/pnpjs';

export interface IPersonaCardProps {
 context: WebPartContext | ApplicationCustomizerContext;
 profileProperties : PeoplePickerEntity;
}
