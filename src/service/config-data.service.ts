import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {

  configData: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInIt() {
  }
     
  loadData() {
    this.http.get("./assets/configData.json").subscribe((data) => {
      this.configData =  data;
    });

  }


  getData() {
    const data = window.localStorage.getItem("assignmentConfiguration");
    if(data) {
      return JSON.parse(data)
    } else {
      this.loadData()
      return this.configData
    }
  }

  setData(newData: any) {
    window.localStorage.setItem("assignmentConfiguration", JSON.stringify(newData))
  }
}
