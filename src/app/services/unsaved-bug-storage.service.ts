import { Injectable } from '@angular/core';
import { BugElement } from '../interfaces/bug-element.interface';
import { Screenshot } from '../interfaces/screenshot.interface';

@Injectable({
  providedIn: 'root'
})
export class UnsavedBugStorageService {

  constructor() { }

  //bugReport: BugReport = {};
  bugReport: BugReport = new BugReport([], []);

  saveReportInStorage(bugReport: BugReport){
    window.localStorage.setItem('ezBugReport', JSON.stringify(bugReport))
  }

  addSelectedElements(elements: BugElement[]){
    this.bugReport.elements = elements!;
    this.saveReportInStorage(this.bugReport)
  }

  getReportFromStorage(){
    const dataFromStorage = window.localStorage.getItem('ezBugReport');
    if(dataFromStorage) this.bugReport = JSON.parse(dataFromStorage);
  }

  addScreenshots(screenshots: Screenshot[]){
    this.bugReport.screenshots = screenshots;
    this.saveReportInStorage(this.bugReport)
  }

  getScreenshots(){
    return this.bugReport.screenshots
  }

}

/* export interface BugReport {
  elements: BugElement[];
  screenshots: Screenshot[];
} */
export class BugReport {
  elements: BugElement[];
  screenshots: Screenshot[];

  constructor (elements: BugElement[], screenshots: Screenshot[]) {
    this.elements = elements;
    this.screenshots = screenshots;
  }

}
