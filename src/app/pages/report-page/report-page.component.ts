import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/interfaces/tab.interface';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.less']
})
export class ReportPageComponent implements OnInit {

  activeTab: string = 'select';

  constructor() { }

  ngOnInit(): void {
  }

  tabs: Tab[] = [
    {id: 'select', label: 'Select', isActive: true},
    {id: 'screenshots', label: 'Screenshots', isActive: false},
    {id: 'details', label: 'Details', isActive: false},
    {id: 'submit', label: 'Submit', isActive: false},
  ];

  setActiveTab(activeTab: string){
    this.activeTab = activeTab
  }

}
