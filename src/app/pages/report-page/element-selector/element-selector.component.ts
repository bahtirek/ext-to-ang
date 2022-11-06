import { Component, OnInit } from '@angular/core';
import { SelectedElementsService } from 'src/app/services/selected-elements.service';
import { SelectService } from '../../../services/select.service';

@Component({
  selector: 'app-element-selector',
  templateUrl: './element-selector.component.html',
  styleUrls: ['./element-selector.component.less']
})
export class ElementSelectorComponent implements OnInit {
  label: string = '';

  constructor(private select: SelectService, private selectedElementService: SelectedElementsService ) { }

  isSelectetorActive: boolean = false;
  activeBtn: string = '';
  currentBtn = "ui-br-ext-select-button";
  isAnyElementSelected: boolean = false;

  ngOnInit(): void {
    this.selectedElementService.displayAllSelectedElements();
  }

  onSelectBtnClick () {
    this.activeBtnUpdate();
    this.select.isElementSelected.subscribe((isSelected) => {
      this.isAnyElementSelected = isSelected;
    })
  }

  activeBtnUpdate(){
    if(this.isSelectetorActive) {
      this.isSelectetorActive = false;
      this.isAnyElementSelected = false;
      this.select.onDeselect(false);
    } else {
      this.isSelectetorActive = true;
      this.isAnyElementSelected = false;
      this.selectedElementService.resetSelectedElement();
      this.select.onSelect();
    }
  }

  saveLabel(){
    this.label = this.label.trim();
    if(this.label) {
      if (this.selectedElementService.completeElementSelection(this.label)) {
        this.onSelectBtnClick();
        this.label = '';
      }
    } 
  }

}
