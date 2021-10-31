
import { MSGraphClient } from "@microsoft/sp-http";

export class CalendarService {
    public async getEvents(ctx: any, startDate: any, endDate: any) {
        try {
            let queryString = "?top=365&startdatetime=" + startDate + "&enddatetime=" + endDate;
            return new Promise<any>(async (resolve, reject) => {
                ctx.msGraphClientFactory
                    .getClient()
                    .then((client: MSGraphClient) => {
                        client
                            .api("/me/calendarview" + queryString)
                            .version("v1.0")
                            .get((error: any, response: any) => {
                                if (error) {
                                    reject(error);
                                }
                                if (response) {
                                    resolve(response.value);
                                }
                            });
                    });
            });
        }
        catch (err) {
            Promise.reject(err);
        }
    }    
}

