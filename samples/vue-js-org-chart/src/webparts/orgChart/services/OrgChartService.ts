import Employee from '../models/Employee';
import { IListService } from '../models/IListService';
import { sp } from '@pnp/sp';
import Constants from '../models/Constants';

export class OrgChartService implements IListService {

    private static instance: OrgChartService;

    private constructor() {
    }

    static getInstance() {
        if (!OrgChartService.instance) {
            OrgChartService.instance = new OrgChartService();
        }
        return OrgChartService.instance;
    }

    getEmployees(): Promise<Array<Employee>> {
        return new Promise((resolve, reject) => {
            sp.web.lists.getByTitle(Constants.EMPLOYEES_LIST_TITLE)
                .items
                .select("Id,Title,EMail,JobTitle,WorkPhone,PhotoUrl,ManagerID/Id")
                .expand("ManagerID")
                .getAll()
                .then((data) => {
                    resolve(data.map((item) => {
                        return new Employee({
                            id: item.Id,
                            Title: item.Title,
                            EMail: item.EMail,
                            JobTitle: item.JobTitle,
                            Phone: item.WorkPhone,
                            PhotoUrl: item.PhotoUrl,
                            pid: item.ManagerID ? item.ManagerID.Id : undefined
                        })
                    }))
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export default OrgChartService.getInstance();