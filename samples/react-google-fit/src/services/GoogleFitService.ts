import { ServiceScope, ServiceKey } from "@microsoft/sp-core-library";
import { IDataService } from './IDataService';
import { HttpClient, HttpClientResponse, IHttpClientOptions } from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';
import { IFitnessActivity, IFitnessPoint, IFitnessPointValue } from './IFitnessActivity';

export class GoogleFitService implements IDataService {
    public static readonly serviceKey: ServiceKey<IDataService> = ServiceKey.create<IDataService>('googleFit:data-service', GoogleFitService);
    private _httpClient: HttpClient;
    private _pageContext: PageContext;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            // Configure the required dependencies  
            this._httpClient = serviceScope.consume(HttpClient.serviceKey);
            this._pageContext = serviceScope.consume(PageContext.serviceKey);
        });
    }

    // Get step count from Google fit data source
    public getStepCount(accessToken: string): Promise<number> {
        return new Promise<number>((resolve: (itemId: number) => void, reject: (error: any) => void): void => {
            this.getGoogleFitData('derived:com.google.step_count.delta:com.google.android.gms:estimated_steps', accessToken)
                .then((fitnessData: IFitnessActivity): void => {
                    var stepsCount: number = 0;
                    var i: number = 0;
                    var j: number = 0;

                    // Calculate step count of each activity
                    for (i = 0; i < fitnessData.point.length; i++) {
                        for (j = 0; j < fitnessData.point[i].value.length; j++) {
                            stepsCount += fitnessData.point[i].value[j].intVal;
                        }
                    }

                    resolve(stepsCount);
                });
        });
    }

    // Get calories burned from Google fit data source
    public getCalories(accessToken: string): Promise<number> {
        return new Promise<number>((resolve: (itemId: number) => void, reject: (error: any) => void): void => {
            this.getGoogleFitData('derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended', accessToken)
                .then((fitnessData: IFitnessActivity): void => {
                    var calories: number = 0;
                    var i: number = 0;
                    var j: number = 0;

                    // Calculate calories burned during each activity
                    for (i = 0; i < fitnessData.point.length; i++) {
                        for (j = 0; j < fitnessData.point[i].value.length; j++) {
                            calories += fitnessData.point[i].value[j].fpVal;
                        }
                    }

                    resolve(calories);
                });
        });
    }

    // Get distance travelled from Google fit data source
    public getDistance(accessToken: string): Promise<number> {
        return new Promise<number>((resolve: (itemId: number) => void, reject: (error: any) => void): void => {
            this.getGoogleFitData('derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta', accessToken)
                .then((fitnessData: IFitnessActivity): void => {
                    var distance: number = 0;
                    var i: number = 0;
                    var j: number = 0;

                    // Calculate distance travelled during each activity
                    for (i = 0; i < fitnessData.point.length; i++) {
                        for (j = 0; j < fitnessData.point[i].value.length; j++) {
                            distance += fitnessData.point[i].value[j].fpVal;
                        }
                    }

                    resolve(distance / 1000);
                });
        });
    }

    // Get activity time from Google fit data source
    public getActivityTime(accessToken: string): Promise<number> {
        return new Promise<number>((resolve: (itemId: number) => void, reject: (error: any) => void): void => {
            this.getGoogleFitData('derived:com.google.activity.segment:com.google.android.gms:merge_activity_segments', accessToken)
                .then((fitnessData: IFitnessActivity): void => {
                    var activityTime: number = 0;
                    var i: number = 0;
                    var j: number = 0;

                    // Calculate activity time spent for each activity
                    for (i = 0; i < fitnessData.point.length; i++) {
                        for (j = 0; j < fitnessData.point[i].value.length; j++) {
                            activityTime += fitnessData.point[i].value[j].intVal;
                        }
                    }

                    resolve(activityTime);
                });
        });
    }

    // Get Google fit data by calling the REST API
    private getGoogleFitData(activityScope: string, accessToken: string): Promise<IFitnessActivity> {
        // Calculate start date, end date
        var startTime: number = new Date().getTime();
        var todayMidnight: Date = new Date();
        todayMidnight.setHours(0, 0, 0, 0);
        var endTime: number = todayMidnight.getTime();

        const requestHeaders: Headers = new Headers();
        requestHeaders.append("Content-type", "application/json");
        requestHeaders.append("Cache-Control", "no-cache");

        const postOptions: IHttpClientOptions = {
            headers: requestHeaders
        };

        let sessionUrl: string = `https://www.googleapis.com/fitness/v1/users/me/dataSources/` + activityScope + `/datasets/` + startTime + `000000-` + endTime + `000000?access_token=` + accessToken;
        return new Promise<IFitnessActivity>((resolve: (itemId: IFitnessActivity) => void, reject: (error: any) => void): void => {
            this._httpClient.get(sessionUrl, HttpClient.configurations.v1, postOptions)
                .then((response: HttpClientResponse) => {
                    response.json().then((responseJSON: IFitnessActivity) => {
                        resolve(responseJSON);
                    });
                });
        });
    }
}