import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAssignments, IConfiguration } from 'src/app/models/iconfiguration';
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

  constructor(
    private modalService: NgbModal,
    private configDataService: ConfigDataService
  ) { }

  ngOnInit(): void {
    this.refreshData()
  }

  refreshData() {
    this.configData = this.configDataService.getData();

    this.currentAssignments = []
    this.configData.units?.forEach((unit) => {
      unit.assignments?.forEach((assignment) => {
        if(this.dateBeforeToday(assignment.assignmentDetails.startDate) &&
        this.dateAfterToday(assignment.assignmentDetails.endDate)) {
          this.currentAssignments.push(assignment)
        }
      })
    })
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
}