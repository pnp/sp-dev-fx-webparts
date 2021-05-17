import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClientFactory, MSGraphClient } from '@microsoft/sp-http';
import { IAzureApp, IPermission } from './components/IAppInterfaces';
import * as strings from 'SitesSelectedManagerWebPartStrings';


export interface IService {
    getApps(apiPermission: string): Promise<IAzureApp[]>;
    getPermissions(siteUrl: URL): Promise<IPermission[]>
    addPermissions(siteUrl: URL, payload: IPermission): Promise<void>;
    deletePermissions(siteUrl: URL, appId: string): Promise<void>;
}

export class Service implements IService {

    public static readonly serviceKey: ServiceKey<IService> =
        ServiceKey.create<IService>('sites-selected-admin-app:IService', Service);

    private _msGraphClientFactory: MSGraphClientFactory;

    private _siteId: string;
    public get siteId(): string {
        return this._siteId;
    }
    public set siteId(v: string) {
        this._siteId = v;
    }

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);

        });
    }

    private getSiteId(siteUrl: URL): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const client = await this._msGraphClientFactory.getClient();
            client
                .api(`sites/${siteUrl.hostname}:${siteUrl.pathname}`)
                .version("v1.0")
                .select("id")
                .get((error, site: any, rawResponse?: any) => {
                    if (site) {
                        this.siteId = site.id;
                        resolve()
                    } else {
                        error ? reject(error) : reject(strings.ErrorUnknown)
                    }
                })
        });
    }

    private getPermissionId(appId: string, permssions: IPermission[]): string {
        let result: string;
        permssions.forEach(element => {
            element.grantedToIdentities.forEach(el => {
                if (el.application.id === appId)
                    result = element.id
            })
        });
        if (!result) {
            return null;
        } else {
            return result;
        }
    }

    public getApps(apiPermissionGuid: string): Promise<IAzureApp[]> {
        return new Promise<IAzureApp[]>(async (resolve, reject) => {
            const client = await this._msGraphClientFactory.getClient();
            client
                .api('applications')
                .version("v1.0")
                .select("id,appId,displayName,requiredResourceAccess")
                .get((error, apps: any, rawResponse?: any) => {
                    if (apps) {
                        const appsWithSitesSelected = apps.value.filter((obj) => {
                            return obj.requiredResourceAccess.some(({ resourceAccess }) =>
                                resourceAccess.some(({ id }) => id === apiPermissionGuid))
                        });
                        resolve(appsWithSitesSelected as IAzureApp[]);
                    } else {
                        error ? reject(error) : reject(strings.ErrorUnknown)
                    }
                });
        });
    }

    public getPermissions(siteUrl: URL): Promise<IPermission[]> {
        return new Promise<IPermission[]>(async (resolve, reject) => {
            const client = await this._msGraphClientFactory.getClient();
            await this.getSiteId(siteUrl);
            client
                .api(`sites/${this.siteId}/permissions`)
                .version("v1.0")
                .get((error, permissions: any, rawResponse?: any) => {
                    if (permissions) {
                        resolve(permissions.value);
                    } else {
                        error ? reject(error) : reject(strings.ErrorUnknown)
                    }
                });
        });
    }

    public addPermissions(siteUrl: URL, payload: IPermission): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const client = await this._msGraphClientFactory.getClient();
            await this.getSiteId(siteUrl);
            client
                .api(`sites/${this.siteId}/permissions`)
                .version("v1.0")
                .post(payload, (error, response: any, rawResponse?: any) => {
                    if (error) {
                        error ? reject(error) : reject(strings.ErrorUnknown)
                    } else {
                        resolve();
                    }
                });
        });
    }

    public deletePermissions(siteUrl: URL, appId: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {


            console.warn('Are we herrrrre');
            
            const client = await this._msGraphClientFactory.getClient();
            console.warn('Are we herrrrre1');

            const permissions = await this.getPermissions(siteUrl);
            console.warn('Are we herrrrre2');
            console.warn('ahhhahha');
            console.warn(appId);
            
            const permissionId = this.getPermissionId(appId, permissions);
            console.warn('Are we herrrrre3....');
            console.warn(permissionId);
            

            if (permissionId) {
                client
                    .api(`sites/${this.siteId}/permissions/${permissionId}`)
                    .version("v1.0")
                    .delete((error, response: any, rawResponse?: any) => {
                        if (error) {
                            console.warn('asdasd');
                            
                            error ? reject(error) : reject(strings.ErrorUnknown)
                        } else {
                            console.warn('ååååååååååååååå');
                            
                            resolve();
                        }
                    });
            } else {
                reject(`${strings.ErrorNoPermissionsFound} ${appId}`)
            }
        });
    }
}