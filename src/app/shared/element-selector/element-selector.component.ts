import { Component, OnInit } from '@angular/core';
import { BugElement } from 'src/app/interfaces/bug-element.interface';
import { SelectedElementsService } from 'src/app/services/selected-elements.service';
import { SelectService } from '../../services/select.service';

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
  selectedElements: BugElement[] = [];

  ngOnInit(): void {
    this.selectedElementService.displayAllSelectedElements();
    this.selectedElements = this.selectedElementService.getElements();
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
        this.selectedElements = this.selectedElementService.getElements();
        this.onSelectBtnClick();
        this.label = '';
      }
    } 
  }

  onDeleteSelectedElement(element: BugElement) {
    this.selectedElements = this.selectedElementService.removeSelection(element.dataLabel)
  }

}
