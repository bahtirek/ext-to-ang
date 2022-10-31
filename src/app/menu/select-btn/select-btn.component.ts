import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActiveBtnService } from 'src/app/services/active-btn.service';
import { OnclickService } from 'src/app/services/onclick.service';

@Component({
  selector: 'app-select-btn',
  templateUrl: './select-btn.component.html',
  styleUrls: ['./select-btn.component.less']
})
export class SelectBtnComponent implements OnInit {
  
  /* Why ! sign is used - https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc */
  @ViewChild('selectBtnElement', {static: false}) selectBtnElement!: ElementRef;

  constructor(private onClick: OnclickService, private activeBtnService: ActiveBtnService) { }


  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-select-button";

  ngOnInit(): void {
    this.activeBtnService.activeBtnObservable.subscribe(
      activeBtn => {
        this.activeBtn = activeBtn;

        /* If other button clicked set this btn to false */
        if(this.activeBtn != this.currentBtn) this.isActive = false;
      }
    )
    window.selectButtonComponent = this;
  }

  onMenuBtnClick () {
    this.activeBtnUpdate();
    this.onClick.onSelect();
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

  fakeClick(){
    this.selectBtnElement.nativeElement.click();
  }

}