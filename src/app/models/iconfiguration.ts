import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface IConfiguration {
    units : IUnits[]
}

export interface IUnits {
    unitDetails: IDetails;
    displayAssignments: boolean;
    assignments: IAssignments[]
}

export interface IAssignments {
    assignmentDetails: IDetails;
    displayTasks: boolean;
    tasks: ITasks[]
}

export interface ITasks {
    taskDetails: IDetails
}

export interface IDetails {
    name: String;
    startDate: NgbDate;
    endDate: NgbDate;
    progress: number;
    weight: number;
}



