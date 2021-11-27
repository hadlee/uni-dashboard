import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IConfiguration } from 'src/app/models/iconfiguration';
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

  constructor(
    private modalService: NgbModal,
    private configDataService: ConfigDataService
  ) { }

  ngOnInit(): void {
    this.refreshData()
  }

  refreshData() {
    this.configData = this.configDataService.getData();
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
}