
export default class Employee {
    id: number;
    Title: string;
    JobTitle: string;
    PhotoUrl: string;
    EMail: string;
    Phone: string;
    pid?: number; // Manager Id

    constructor(options: Employee) {
        this.id = options.id;
        this.Title = options.Title;
        this.JobTitle = options.JobTitle;
        this.PhotoUrl = options.PhotoUrl;
        this.EMail = options.EMail;
        this.Phone = options.Phone;
        this.pid = options.pid;
    }
}