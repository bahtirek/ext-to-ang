import { Component, OnInit } from '@angular/core';
import { ActiveBtnService } from 'src/app/services/active-btn.service';
import { OnclickService } from 'src/app/services/onclick.service';

@Component({
  selector: 'app-select-btn',
  templateUrl: './select-btn.component.html',
  styleUrls: ['./select-btn.component.less']
})
export class SelectBtnComponent implements OnInit {

  constructor(private onClick: OnclickService, private activeBtnService: ActiveBtnService) { }

  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-select-button";

  ngOnInit(): void {
    this.activeBtnService.activeBtnObservable.subscribe(
      activeBtn => {
        this.activeBtn = activeBtn;
        console.log(activeBtn);
        
        if(this.activeBtn != this.currentBtn) this.isActive = false;
      }
    )
  }

  onMenuBtnClick () {
    this.onClick.onSelect();
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
