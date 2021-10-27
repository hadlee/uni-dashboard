import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {


  isCollapsed: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
