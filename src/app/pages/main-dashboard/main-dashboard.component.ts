import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfigureComponent } from '../configure/configure.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  selectedHeading: String = "overview";

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openConfigureModal() {
    this.modalService.open(ConfigureComponent, {
      centered: true,
      size: "xl",
      scrollable: true
    })
  }

}
