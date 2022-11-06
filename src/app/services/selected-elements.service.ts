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
    const dataLabel = `${Date.now()}--${label.replace(/\s+/g, '-').toLowerCase()}`;
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

  positionLabel(label: string, dataLabel: string, element?: any){
    if(!element) element = this.lastSelectedElement;
    const position = this.getPosition(element);
    const elementLabel = `<div class="ez-bug-element-label" data-ez-bug-element-label="${dataLabel}" style="top:${position.top-18}px; left:${position.left-3}px">${label}</div>`
    
    document.body.insertAdjacentHTML('beforeend', elementLabel);
  }

  getPosition(element: any) {
    var clientRect = element.getBoundingClientRect();
    return {left: clientRect.left + document.body.scrollLeft, top: clientRect.top + document.body.scrollTop};
  }

  removeSelection(dataLabel: any) {
    this.elements = this.elements.filter(element => element.dataLabel != dataLabel);
    const elements = document.querySelectorAll(`[data-ez-bug-element-label="${dataLabel}"]`);
    elements[0].remove();
  }

  displayAllSelectedElements() {
    console.log(this.elements);
    
    this.elements.forEach(elementData => {
      let element: any;
      try {
        element = document.evaluate(elementData.xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
      } catch(e) {
          console.log(e)
      }

      element.classList.add('ui-br-ext-outlined-element-selected');
      element.setAttribute('ez-bug-selected-label', elementData.dataLabel);

      this.positionLabel(elementData.label, elementData.dataLabel, element);
    });
  }
}


