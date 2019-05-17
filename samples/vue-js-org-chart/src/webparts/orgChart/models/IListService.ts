import Employee from "./Employee";

export interface IListService {
    getEmployees(): Promise<Array<Employee>>;
}