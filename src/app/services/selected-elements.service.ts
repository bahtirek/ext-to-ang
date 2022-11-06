import { Injectable } from '@angular/core';
import { BugElement } from '../interfaces/bug-element.interface';
import { XpathService } from './xpath.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedElementsService {

  constructor(private xpath: XpathService) { }

  elements: BugElement[] = [];

  lastSelectedElement: any;

  completeElementSelection(label: string){
    const dataLabel = `${Date.now()}--${label}`;
    if(this.lastSelectedElement){
      this.lastSelectedElement.classList.remove('ui-br-ext-outlined-element');
      this.lastSelectedElement.classList.add('ui-br-ext-outlined-element-selected');
      const xPath: any = this.xpath.getElementXpath(this.lastSelectedElement);
      this.lastSelectedElement.setAttribute('ez-bug-selected-label', dataLabel);
      this.elements.push(new BugElement(label, xPath, dataLabel));
      this.positionLabel(label, dataLabel);
      return true;
    } else {
      return false;
    }
  }

  resetSelectedElement(){
    this.lastSelectedElement = null;
  }

  positionLabel(label: string, dataLabel: string){
    const position = this.getPosition(this.lastSelectedElement);
    
    const elementLabel = `<div class="ez-bug-element-label" data-ez-bug-element-label="${dataLabel}" style="top:${position.top-18}px; left:${position.left-3}px">${label}</div>`
    document.body.insertAdjacentHTML('beforeend', elementLabel);
  }

  getPosition(element: any) {
    var clientRect = element.getBoundingClientRect();
    return {left: clientRect.left + document.body.scrollLeft, top: clientRect.top + document.body.scrollTop};
  }

  removeSelection(dataLabel: any) {
    console.log(dataLabel);
    
    this.elements = this.elements.filter(element => element.dataLabel != dataLabel);
    const elements = document.querySelectorAll(`[data-ez-bug-element-label="${dataLabel}"]`);
    elements[0].remove();
  }
}


