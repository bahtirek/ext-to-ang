import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedElementsService {

  constructor() { }

  elements: HTMLElement[] = [];

  lastSelectedElement!: HTMLElement;

  addSelectedClass(){
    if(this.lastSelectedElement && this.lastSelectedElement.classList.contains('ui-br-ext-outlined-element')){
      this.lastSelectedElement.classList.remove('ui-br-ext-outlined-element');
      this.lastSelectedElement.classList.add('ui-br-ext-outlined-element-selected');
      this.lastSelectedElement = null!;
    } else {
      this.lastSelectedElement = null!;
    }
  }
}


