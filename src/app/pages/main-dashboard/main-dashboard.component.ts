import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration } from 'chart.js';
import { IAssignments, IConfiguration, IDetails, IUnits } from 'src/app/models/iconfiguration';
import { ConfigDataService } from 'src/service/config-data.service';

import { ConfigureComponent } from '../configure/configure.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  selectedHeading: String = "overview";

  configData!: IConfiguration;
  currentAssignments: IAssignments[] = [];
  currentPlannedTasks: IAssignments[] = [];
  currentUnits: IUnits[] = [];


  barChartData = {
    labels: [ '2006' ],
    datasets: [
      { data: [ 65 ], label: 'Current Progress' },
      { data: [ 28], label: 'Current Time' }
    ]
  };

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'y',
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
        max: 100
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  
  constructor(
    private modalService: NgbModal,
    private configDataService: ConfigDataService
  ) { }

  ngOnInit(): void {
    this.refreshData()
  }

  refreshData() {
    this.configData = this.configDataService.getData();

    this.currentUnits = [];
    // this.configData.units?.forEach((unit) => {
    //   unit.assignments?.forEach((assignment) => {
    //     if(this.dateBeforeToday(assignment.assignmentDetails.startDate) &&
    //     this.dateAfterToday(assignment.assignmentDetails.endDate)) {
    //       this.currentAssignments.push(assignment)
    //     }
    //   })
    // })

    this.configData.units?.forEach((unit) => {
        if(this.dateBeforeToday(unit.unitDetails.startDate) &&
        this.dateAfterToday(unit.unitDetails.endDate)) {
          this.currentUnits.push(unit)
        }
    })
    console.log(this.currentUnits)
    return true
  }

  openConfigureModal() {
    const modalRef= this.modalService.open(ConfigureComponent, {
      centered: true,
      size: "xl",
      scrollable: true,
      beforeDismiss: () =>  {
        modalRef.componentInstance.saveData()
        return this.refreshData()
      }
    })
    
  }

  loadData() {
    return this.configDataService.getData();
  }

  dateAfterToday(dates: NgbDate) {
    const currentDate = new Date();
    const currentDates = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    const date = new Date(dates.year, dates.month-1, dates.day);
    return currentDates.getTime() <= date.getTime();
  }


  dateBeforeToday(dates: NgbDate) {
    const currentDate = new Date();
    const currentDates = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    const date = new Date(dates.year, dates.month-1, dates.day);
    return currentDates.getTime() >= date.getTime();
  }

  setAssignment(bucketNum: number, assignmentIndex: number) {
    this.currentAssignments[assignmentIndex].bucketNum = bucketNum;
    this.currentPlannedTasks[bucketNum] = this.currentAssignments[assignmentIndex];
    this.configDataService.setData(this.currentAssignments);
  }

  calculateTimePercent(details: IDetails) {
    let currentDate = new Date().getTime();
    let startDate = new Date(details.startDate.year,details.startDate.month,details.startDate.day).getTime();
    let endDate = new Date(details.endDate.year,details.endDate.month,details.endDate.day).getTime();
    console.log((((endDate - currentDate) / (endDate - startDate)) * 100).toFixed(0) + '%')
    return (((endDate - currentDate) / (endDate - startDate)) * 100).toFixed(0) + '%';
  }

  // calculateAnyProgress(any: any, type: string) {
  //   switch(type) {
  //     case('Unit'):

  //   }
  // }

  // calculateUnitProgress(unit: IUnits) {

  // }

  // calculateAssignmentProgress(assignment: IAssignments) {

  // }

}