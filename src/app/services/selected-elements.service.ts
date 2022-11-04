import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedElementsService {

  constructor() { }

  elements: HTMLElement[] = [];

  lastSelectedElement!: HTMLElement;

  addSelectedClass(){
    this.lastSelectedElement.classList.remove('ui-br-ext-outlined-element');
    this.lastSelectedElement.classList.add('ui-br-ext-outlined-element-selected');
  }
}


