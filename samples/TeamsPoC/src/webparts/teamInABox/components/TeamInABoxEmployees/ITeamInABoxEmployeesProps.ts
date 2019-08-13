import { IMatter, IEmployee } from "../../../../models";
import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface ITeamInABoxEmployeesProps {
    context: IWebPartContext;
    matter: IMatter;
    employees: IEmployee[];
}
