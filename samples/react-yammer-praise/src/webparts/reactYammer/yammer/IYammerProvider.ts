import IPraise from "../interface/IPraise";

export interface IYammerProvider {
   
    postPraise(praise:IPraise):Promise<any>;
    
    getGroups():Promise<any>;
}