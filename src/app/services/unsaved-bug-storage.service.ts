import { Injectable } from '@angular/core';
import { BugElement } from '../interfaces/bug-element.interface';

@Injectable({
  providedIn: 'root'
})
export class UnsavedBugStorageService {

  constructor() { }

  bugReport: BugReport = {};
  //bugReport: BugReport = new BugReport({}, []);

  saveReportInStorage(bugReport: BugReport){
    window.localStorage.setItem('ezBugReport', JSON.stringify(bugReport))
  }

  addSelectedElements(elements: BugElement[]){
    this.bugReport.elements = elements;
    this.saveReportInStorage(this.bugReport)
  }

  getReportFromStorage(){
    const dataFromStorage = window.localStorage.getItem('ezBugReport');
    if(dataFromStorage) this.bugReport = JSON.parse(dataFromStorage);
  }


}

export interface BugReport {
  elements?: BugElement[];
  screenshots?: any[];
}
/* export class BugReport {
  elements: BugElement;
  screenshots: any[];

  constructor (elements: BugElement, screenshots: any[]) {
    this.elements = elements;
    this.screenshots = screenshots;
  }

} */
