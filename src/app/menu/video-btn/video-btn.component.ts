import { Component, OnInit } from '@angular/core';
import { ActiveBtnService } from 'src/app/services/active-btn.service';

@Component({
  selector: 'app-video-btn',
  templateUrl: './video-btn.component.html',
  styleUrls: ['./video-btn.component.less']
})
export class VideoBtnComponent implements OnInit {

  constructor(private activeBtnService: ActiveBtnService) { }

  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-video-button";

  ngOnInit(): void {
    this.activeBtnService.activeBtnObservable.subscribe(
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
      this.activeBtnService.activeBtnSource.next('');
    } else {
      this.isActive = true;
      this.activeBtnService.activeBtnSource.next(this.currentBtn);
    }
  }

}
