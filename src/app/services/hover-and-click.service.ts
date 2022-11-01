import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoverAndClickService {

  constructor() { }

  addClickBlocker (bodyChildren?: any) {
    if(!bodyChildren) {
        bodyChildren = document.querySelectorAll('body > *:not(ez-bug-ext):not(script):not(noscript):not(style)')
    }
    
    bodyChildren.forEach((el: any) => {
        el.addEventListener('click', this.preventClick, {capture: true});
        el.addEventListener('mousedown', this.preventClick, {capture: true});
        el.addEventListener('mouseup', this.preventClick, {capture: true});
        el.addEventListener('dblclick', this.preventClick, {capture: true});
    });
    }

    removeClickBlocker (bodyChildren?: any) {
    if(!bodyChildren) {
        bodyChildren = document.querySelectorAll('body > *:not(#ui-br-ext-extension):not(script):not(noscript):not(style)')
    }
    bodyChildren.forEach((el: any) => {
        el.removeEventListener('click', this.preventClick, true);
        el.removeEventListener('mousedown', this.preventClick, true);
        el.removeEventListener('mouseup', this.preventClick, true);
        el.addEventListener('dblclick', this.preventClick, {capture: true});
        el.classList.remove('ui-br-ext-outlined-element');
    });
    }

    preventClick = (event: any) => this.preventClickHandler(event);

    preventClickHandler = function(event: any) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      return false;
    }

    hoverOn = (event: any) => this.hoverOnHandler(event);
    hoverOff = (event: any) => this.hoverOffHandler(event);

    addHover () {
        const body: any = document.querySelector('body');
        body.addEventListener('mouseover', this.hoverOn);
        body.addEventListener('mouseout', this.hoverOff);
    }

    removeHover () {
        const body: any = document.querySelector('body');
        body.removeEventListener('mouseover', this.hoverOn);
        body.removeEventListener('mouseout', this.hoverOff);
    }

    hoverOnHandler (event: any) {
        if(!event.target.classList.value.includes('ui-br-ext-')){
            event.target.classList.add('ui-br-ext-hovered');
        }
    }

    hoverOffHandler (event: any) {
        event.target.classList.remove('ui-br-ext-hovered');
    }
}
