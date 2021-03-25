import { HttpRequestError } from '@pnp/odata';
import { sp } from "@pnp/sp";
import { PermissionKind } from '@pnp/sp/security';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { IBaseItem, IBaseLookupItem } from '../models';
import { LogHelper } from 'utilities';

export class BaseService {
    constructor() {
    }

    public handleHttpError(methodName: string, error: HttpRequestError): void {
        this.logError(methodName, error);
    }

    public logError(methodName: string, error: Error) {
        LogHelper.exception(this.constructor.name, methodName, error);
    }

    public logPnpError(methodName: string, error: HttpRequestError | any): string | undefined {
        let msg: string | undefined;
        if (error instanceof HttpRequestError) {
            if (error.message) {
                msg = error.message;
                LogHelper.error(this.constructor.name, methodName, msg);
            }
            else {
                LogHelper.exception(this.constructor.name, methodName, error);
            }
        }
        else if (error.data != null && error.data.responseBody && error.data.responseBody.error && error.data.responseBody.error.message) {
            // for email exceptions they weren't coming in as "instanceof HttpRequestError"
            msg = error.data.responseBody.error.message.value;
            LogHelper.error(this.constructor.name, methodName, msg!);
        }
        else if (error instanceof Error) {
            if (error.message.indexOf('[412] Precondition Failed') !== -1) {
                msg = 'Save Conflict. Your changes conflict with those made concurrently by another user. If you want your changes to be applied, resubmit your changes.';
                LogHelper.error(this.constructor.name, methodName, msg);
            }
            else if (error.message !== 'Unexpected token < in JSON at position 0') {
                // 'Unexpected token < in JSON at position 0' will be thrown if XML file is read; this was issue in MDF project
                msg = error.message;
                LogHelper.error(this.constructor.name, methodName, msg);
            }
            return msg;
        }
    }

    public mapBaseItemProperties(sourceItem: any, mapFromStream: boolean = false): IBaseItem {
        if (sourceItem !== undefined && sourceItem !== null) {
          if (mapFromStream) {
            //alert(sourceItem["Created."]);
            return {
              id: sourceItem.ID,
              title: sourceItem.Title,
              createdDate: sourceItem["Created."] !== null ? new Date(sourceItem["Created."]) : null,
              modifiedDate: sourceItem["Modified."] !== null ? new Date(sourceItem["Modified."]) : null,
              author: sourceItem.Author !== null ? this.mapPersonaProps(sourceItem.Author) : null,
              editor: sourceItem.Editor !== null ? this.mapPersonaProps(sourceItem.Editor) : null,
              etag: sourceItem.__metadata ? sourceItem.__metadata.etag : new Date().toISOString(),
            };
          } else {
            return {
                id: sourceItem.ID,
                title: sourceItem.Title,
                createdDate: sourceItem.Created !== null ? new Date(sourceItem.Created) : null,
                modifiedDate: sourceItem.Modified !== null ? new Date(sourceItem.Modified) : null,
                author: sourceItem.Author !== null ? this.mapPersonaProps(sourceItem.Author) : null,
                editor: sourceItem.Editor !== null ? this.mapPersonaProps(sourceItem.Editor) : null,
                etag: sourceItem.__metadata ? sourceItem.__metadata.etag : new Date().toISOString(),
            };
          }
        }

        return { id: undefined };
    }

    public mapPersonaProps(item: any): IPersonaProps | null {
        // Note it's okay if the lookup passed in does not have all these properties but these below are all the 'possible ones' we might use
        if (item && item.Name) {
            let persona: IPersonaProps = {};
            persona.id = item.Name;
            persona.text = item.Title;
            persona.secondaryText = item.JobTitle;

            return persona;
        }
        else if(Array.isArray(item)) {
          let persona: IPersonaProps = {};
          persona.id = item[0].email;
          persona.text = item[0].title;
          persona.secondaryText = '';

          return persona;
        }
        else {
            return null;
        }
    }

    public getLookupId(lookupValue: any): number | null {
        if (lookupValue !== undefined && lookupValue !== null && lookupValue.ID) {
            return lookupValue.ID;
        }
        else {
            return null;
        }
    }

    public getMultiLookupIds(lookupValue: any): number[] {
        if (lookupValue !== undefined && lookupValue !== null) {
            return lookupValue.results.map(i => i.ID);
        }
        else {
            return [];
        }
    }

    public getLookup(lookupValue: any): IBaseLookupItem | null {
        if (lookupValue !== undefined && lookupValue !== null && lookupValue.ID) {
            return { id: lookupValue.ID, name: lookupValue.Title };
        }
        else {
            return null;
        }
    }

    public getMultiLookup(lookupValue: any): IBaseLookupItem[] {
        if (lookupValue !== undefined && lookupValue !== null) {
            // tslint:disable-next-line:arrow-return-shorthand
            return lookupValue.results.map(i => { return { id: i.ID, name: i.Title }; });
        }
        else {
            return [];
        }
    }

    public getMultiChoice(choice: any): string[] {
        if (choice !== undefined && choice !== null && choice.results !== null) {
            // tslint:disable-next-line:arrow-return-shorthand
            return choice.results;
        }
        else {
            return [];
        }
    }

    protected getEmailProperty(object: any): string {
        // SharePoint User Information list uses "EMail" as property name
        // SharePoint User Profile uses "Email" as property name
        // To support mock data, we need ability to "translate" the property name
        return object.Email ? object.Email : (object.EMail ? object.EMail : '');
    }

    protected async checkUserPermission(listTitle: string, permission: PermissionKind) {
        let userHasPermission: boolean = false;
        let perms = await sp.web.lists.getByTitle(listTitle)
            .effectiveBasePermissions
            .get()
            .catch(e => { this.logPnpError('checkUserPermission', e); return false; });

        if (perms && perms.EffectiveBasePermissions) {
            userHasPermission = sp.web.hasPermissions(perms.EffectiveBasePermissions, permission);
        }

        LogHelper.verbose(this.constructor.name, 'checkUserPermission', `list=${listTitle},permission=${PermissionKind[permission]},userHasPermission=${userHasPermission}`);

        return userHasPermission;
    }
}
