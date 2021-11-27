import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { IAssignments, IConfiguration, ITasks, IUnits } from 'src/app/models/iconfiguration';
import { ConfigDataService } from 'src/service/config-data.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent {


  configuartionDetials!: IConfiguration; 
  // = {
  //   units: [{
  //     unitDetails: {
  //       name: "Math",
  //       startDate: new NgbDate(2021,10,5),
  //       endDate: new NgbDate(2021,10,5),
  //       progress: 25,
  //       weight: 50
  //     },
  //     displayAssignments: true,
  //     assignments: [{
  //       assignmentDetails: {
  //         name: "Calculate Circumference",
  //         startDate: new NgbDate(2021,10,5),
  //         endDate: new NgbDate(2021,10,5),
  //         progress: 25,
  //         weight: 50
  //       },
  //       displayTasks: true,
  //       tasks: [{
  //         taskDetails: {
  //           name: "Die",
  //           startDate: new NgbDate(2021,10,5),
  //           endDate: new NgbDate(2021,10,5),
  //           progress: 25,
  //           weight: 50
  //         },
  //       }]
  //     }]
  //   },
  //   {
  //     unitDetails: {
  //       name: "Science",
  //       startDate: new NgbDate(2021,10,5),
  //       endDate: new NgbDate(2021,10,5),
  //       progress: 25,
  //       weight: 50
  //     },
  //     displayAssignments: true,
  //     assignments: [{
  //       assignmentDetails: {
  //         name: "How Fast is a Car",
  //         startDate: new NgbDate(2021,10,5),
  //         endDate: new NgbDate(2021,10,5),
  //         progress: 25,
  //         weight: 50
  //       },
  //       displayTasks: true,
  //       tasks: [{
  //         taskDetails: {
  //           name: "Drive Car",
  //           startDate: new NgbDate(2021,10,5),
  //           endDate: new NgbDate(2021,10,5),
  //           progress: 25,
  //           weight: 50
  //         },
  //       },
  //       {
  //         taskDetails: {
  //           name: "Jump Out of Car",
  //           startDate: new NgbDate(2021,10,5),
  //           endDate: new NgbDate(2021,10,5),
  //           progress: 25,
  //           weight: 50
  //         },
  //       }]
  //     }]
  //   }]
  // }
  isCollapsed: boolean = true;

  constructor( private configDataService: ConfigDataService,
    private activeModal: NgbActiveModal) { }

  ngOnInit(): void { 
    this.configuartionDetials = this.configDataService.getData()


   }


  addNewUnit() {
    let newUnit = {
      unitDetails: {
        name: "New Unit",
        startDate: new NgbDate(2021,10,5),
        endDate: new NgbDate(2021,10,5),
        progress: 0,
        weight: 50
      },
      displayAssignments: true,
      assignments: [{
        assignmentDetails: {
          name: "Assignment One",
          startDate: new NgbDate(2021,10,5),
          endDate: new NgbDate(2021,10,5),
          progress: 0,
          weight: 50
        },
        displayTasks: true,
        tasks: [{
          taskDetails: {
            name: "Task One",
            startDate: new NgbDate(2021,10,5),
            endDate: new NgbDate(2021,10,5),
            progress: 0,
            weight: 50
          },
        }]
      }]
    };
    this.configuartionDetials.units.push(newUnit);
  }

  addNewAssignment(addToUnitIndex : number) {
    let newAssignment = {
      assignmentDetails: {
        name: "Assignment One",
        startDate: new NgbDate(2021,10,5),
        endDate: new NgbDate(2021,10,5),
        progress: 0,
        weight: 50
      },
      displayTasks: true,
      tasks: [{
        taskDetails: {
          name: "Task One",
          startDate: new NgbDate(2021,10,5),
          endDate: new NgbDate(2021,10,5),
          progress: 0,
          weight: 50
        },
      }]
    };
    this.configuartionDetials.units[addToUnitIndex].assignments.push(newAssignment);
  }

  addNewTask(addToUnitIndex : number, addToAssignmentIndex: number) {
    let newTask = {
      taskDetails: {
        name: "Task One",
        startDate: new NgbDate(2021,10,5),
        endDate: new NgbDate(2021,10,5),
        progress: 0,
        weight: 50
      },
    }
    this.configuartionDetials.units[addToUnitIndex].assignments[addToAssignmentIndex].tasks.push(newTask);
  }

  toDateString(date: NgbDate) {
    return `${date.year}/${date.month}/${date.day}`
  }

  saveData() {
    this.configDataService.setData(this.configuartionDetials)
  }
}
