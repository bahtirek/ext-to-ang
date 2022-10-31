import { Component, OnInit } from '@angular/core';
import { ActiveBtnService } from 'src/app/services/active-btn.service';
import { OnclickService } from 'src/app/services/onclick.service';

@Component({
  selector: 'app-report-btn',
  templateUrl: './report-btn.component.html',
  styleUrls: ['./report-btn.component.less']
})
export class ReportBtnComponent implements OnInit {
  
  constructor(private activeBtnService: ActiveBtnService, private onClick: OnclickService) { }

  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-report-button";

  ngOnInit(): void {
    this.activeBtnService.activeBtnSubject.subscribe(
      activeBtn => {
        this.activeBtn = activeBtn;
        if(this.activeBtn != this.currentBtn) this.isActive = false;
      }
    )
  }

  onMenuBtnClick () {
    this.activeBtnUpdate();
  }

  activeBtnUpdate(){
    if(this.isActive) {
      this.isActive = false;
      this.activeBtnService.activeBtnSubject.next('');
    } else {
      this.isActive = true;
      this.activeBtnService.activeBtnSubject.next(this.currentBtn);
    }
  }

}
