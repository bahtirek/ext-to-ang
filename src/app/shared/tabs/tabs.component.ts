import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tab } from 'src/app/interfaces/tab.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent implements OnInit {

  activeTabId: string = '';

  constructor() { }

  ngOnInit(): void {
    const activeTab: Tab = this.tabs.find(tab => tab.isActive)!
    this.activeTabId = activeTab.id;
    
  }

  @Input() tabs: Tab[] = []

  @Output() activeTab = new EventEmitter<string>()


  tabClicked(tabId: string){
    this.activeTabId = tabId;
    this.activeTab.emit(tabId);
    console.log(tabId);
    
  }

}
