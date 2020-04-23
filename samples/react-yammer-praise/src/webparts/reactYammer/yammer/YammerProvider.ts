import axios from "axios";
import IPraise from "../interface/IPraise";
import { IYammerProvider } from './IYammerProvider';

export default class YammerProvider implements IYammerProvider {
    
    private readonly _apiUrl: string = "https://api.yammer.com/api/v1/";

    constructor(private aadToken:string,private currentUser:string){}
    
    private async getUserId(email: string) {
        
        const reqHeaders = {
            "Authorization": `Bearer ${this.aadToken}`
        };
        const result = await axios.get(`${this._apiUrl}users/by_email.json?email=${email}`,{headers:reqHeaders});
        return result.data[0].id;
    }


    public async getGroups(){

        const userId = await this.getUserId(this.currentUser);

        const reqHeaders = {
            "content-type": "application/json",
            "Authorization": `Bearer ${this.aadToken}`
        };

        return axios.get(`${this._apiUrl}groups/for_user/${userId}`, { headers: reqHeaders });

    }

    public async postPraise(praise: IPraise) {
        const userId = await this.getUserId(praise.nominee);

        const reqHeaders = {
            "content-type": "multipart/form-data",
            "Authorization": `Bearer ${this.aadToken}`
        };

        const form = new FormData();
        form.append("body", "posting as praise");
        form.append("group_id", praise.groupId);
        form.append("skip_body_notifications", "true");
        form.append("praise", `{"comment":"${praise.comment}","icon":"${praise.icon}","praised_user_ids":[${userId}]}`);

        return axios.post(`${this._apiUrl}messages.json`, form, { headers: reqHeaders });
    }

}