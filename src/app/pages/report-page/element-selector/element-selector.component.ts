import { Component, OnInit } from '@angular/core';
import { SelectedElementsService } from 'src/app/services/selected-elements.service';
import { SelectService } from '../../../services/select.service';

@Component({
  selector: 'app-element-selector',
  templateUrl: './element-selector.component.html',
  styleUrls: ['./element-selector.component.less']
})
export class ElementSelectorComponent implements OnInit {

  constructor(private onClick: SelectService, private selectedElementService: SelectedElementsService ) { }

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
      this.selectedElementService.addSelectedClass();
    } else {
      this.isActive = true;
      this.onClick.onSelect();
    }
  }

}
