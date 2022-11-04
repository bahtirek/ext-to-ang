import { Component, OnInit } from '@angular/core';
import { SelectService } from '../../../services/select.service';

@Component({
  selector: 'app-element-selector',
  templateUrl: './element-selector.component.html',
  styleUrls: ['./element-selector.component.less']
})
export class ElementSelectorComponent implements OnInit {

  constructor(private onClick: SelectService ) { }

  isActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-select-button";

  ngOnInit(): void {

  }

  onSelectBtnClick () {
    this.activeBtnUpdate()
  }

  activeBtnUpdate(){
    if(this.isActive) {
      this.isActive = false;
      this.onClick.onDeselect(false);
    } else {
      this.isActive = true;
      this.onClick.onSelect();
    }
  }

}
