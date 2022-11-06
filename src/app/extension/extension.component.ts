import { Component, OnInit } from '@angular/core';
import { ActiveBtnService } from '../services/active-btn.service';
import { UnsavedBugStorageService } from '../services/unsaved-bug-storage.service';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.less']
})
export class ExtensionComponent implements OnInit {

  constructor(private activeBtnService: ActiveBtnService, private unsavedBugStorage: UnsavedBugStorageService) { }

  activeBtn: string = '';

  ngOnInit(): void {
    this.activeBtnService.activeBtnSubject.subscribe(
      activeBtn => {
        this.activeBtn = activeBtn;
      }
    )
    this.unsavedBugStorage.getReportFromStorage();
  }

}
