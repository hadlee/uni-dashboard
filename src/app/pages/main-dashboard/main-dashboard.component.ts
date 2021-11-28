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
        console.log(assignment)
        if(this.dateBeforeToday(assignment.assignmentDetails.startDate) &&
        this.dateAfterToday(assignment.assignmentDetails.endDate)) {
          this.currentAssignments.push(assignment)
        }
      })
    })
    console.log(this.currentAssignments)
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
    const date = new Date();
    const currentDate = new NgbDate(date.getUTCFullYear(), date.getUTCMonth() + 1,date.getUTCDate());
    if(dates.year > currentDate.year) {
      console.log("failing on year")
      return true;
    }
    else if( dates.month > currentDate.month) {
      console.log("failing on month")
      return true;
    }
    else if(dates.day >= currentDate.day) {
      console.log("failing on day")
        return true;
      }
    return false;
  }


  dateBeforeToday(dates: NgbDate) {
    const date = new Date();
    const currentDate = new NgbDate(date.getUTCFullYear(), date.getUTCMonth() + 1,date.getUTCDate());
    console.log(dates)
    if(dates.year < currentDate.year) {
      console.log(currentDate.year)
      console.log("failing on year 2")
      return true;
    }
    else if( dates.month < currentDate.month) {
      console.log("failing on month 2")
      console.log(currentDate.month)
      return true;
    }
    else if(dates.day <= currentDate.day) {
      console.log("failing on day 2")
        return true;
      }
    return false;
  }
}