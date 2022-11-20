import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ActiveBtnService } from '../services/active-btn.service';
import { AuthService } from '../services/auth.service';
import { ToggleExtensionService } from '../services/toggle-extension.service';
import { UnsavedBugStorageService } from '../services/unsaved-bug-storage.service';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.less']
})
export class ExtensionComponent implements OnInit {

  hideExtension: boolean = false;

  constructor(private activeBtnService: ActiveBtnService, private unsavedBugStorage: UnsavedBugStorageService, private toggleExtension: ToggleExtensionService, private auth: AuthService, private accountService: AccountService) { }

  activeBtn: string = '';

  config = {
      registrationKey:"1636b16263fc27",
      userEmail:"bahtirek@gmail.com",
      userAppId:"79883af2-806e-4db7-b217-3c90e3dc2637"
  }
  ngOnInit(): void {
    this.activeBtnService.activeBtnSubject.subscribe(
      activeBtn => {
        this.activeBtn = activeBtn;
      }
    )
    this.unsavedBugStorage.getReportFromStorage();

    this.toggleExtension.toggle.subscribe(
      state => {
        this.hideExtension = state
      }
    )

    this.auth.auth(this.config).subscribe(data => {
      this.accountService.account = data;
    })
  }

}
