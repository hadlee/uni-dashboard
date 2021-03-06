import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface IConfiguration {
    units : IUnits[],
    // colorSettings: {
    //     backgroundColor: String;
    //     textColor: String;
    //     buttonColor: String;
    //     graphColourOne: String;
    //     graphColourTwo: String;
    // }
}

export interface IUnits {
    unitDetails: IDetails;
    displayAssignments: boolean;
    assignments: IAssignments[]
}

export interface IAssignments {
    assignmentDetails: IDetails;
    displayTasks: boolean;
    tasks: ITasks[];
    bucketNum?: number;
}

export interface ITasks {
    taskDetails: IDetails
    bucketItemNum?: number;
}

export interface IDetails {
    name: string;
    startDate: NgbDate;
    endDate: NgbDate;
    progress: number;
    weight: number;
}



