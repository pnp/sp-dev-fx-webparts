export interface IDataService {
    getStepCount: (accessToken: string) => Promise<any>;
    getCalories: (accessToken: string) => Promise<any>;
    getDistance: (accessToken: string) => Promise<any>;
    getActivityTime: (accessToken: string) => Promise<any>;
}