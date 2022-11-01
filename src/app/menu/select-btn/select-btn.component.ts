import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    this.activeBtnService.activeBtnSubject.subscribe(
      activeBtn => {
        this.activeBtn = activeBtn;    
        this.deselect()   
      }
    )
    //window.selectButtonComponent = this;
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
      this.onClick.onSelect();
    }
  }

  deselect(){
    /* If other button clicked set this btn to false */
    if(this.activeBtn != this.currentBtn) {
      this.isActive = false;
      this.onClick.onDeselect();
    }
  }

}
