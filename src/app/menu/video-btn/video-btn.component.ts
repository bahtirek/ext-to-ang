import { Component, OnInit } from '@angular/core';
import { ActiveBtnService } from 'src/app/services/active-btn.service';
import { SelectService } from 'src/app/services/select.service';

@Component({
  selector: 'app-video-btn',
  templateUrl: './video-btn.component.html',
  styleUrls: ['./video-btn.component.less']
})
export class VideoBtnComponent implements OnInit {

  constructor(private activeBtnService: ActiveBtnService, private onClick: SelectService) { }

  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-video-button";

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
      this.onClick.onDeselect(true);
    }
  }

}
