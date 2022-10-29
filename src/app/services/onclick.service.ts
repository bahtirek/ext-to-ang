import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnclickService {

    constructor() { }

    ui_br_ext_previousElement: any = {
        element : null,
        parentCount : 0
    }

    ui_br_ext_parentLimit = 5;

    currentElementInlineStyle = '';

    onSelect () {
        const allPointerEvent = '';
        const noHighlight = `*{
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }`;

        const head = document.head || document.getElementsByTagName('head')[0];

        const style: any = document.createElement('style');

        style.setAttribute('id','ui-br-ext-extension-style');    

        head.appendChild(style);

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = allPointerEvent+noHighlight;
        } else {
            style.appendChild(document.createTextNode(allPointerEvent+noHighlight));
        }
        this.addClickToHtml(this.getMouseCoordinates);
    }

    onDeselect () {

        document.getElementById('ui-br-ext-extension-style')?.remove();

        this.removeClickFromBody(this.getMouseCoordinates);
        
        // Remove outline from any previously selected elements.
        document.querySelectorAll('.ui-br-ext-outlined-element').forEach((element: any) => {
            element.classList.remove('ui-br-ext-outlined-element');
            element.style.cssText = element.style.cssText.replace('outline: red dashed 3px !important;', '');
            element.style.cssText = element.style.cssText.replace('outline: #4fff00 dashed 3px !important;', '');
            element.style.cssText = element.style.cssText.replace('outline: rgb(79, 255, 0) dashed 3px !important;', '');
            element.removeAttribute('data-ext-index');
        });

        // Reset the global variable that holds the previously selected element properties.
        // Used to calculte element's parent.
        if(this.ui_br_ext_previousElement){
            this.ui_br_ext_previousElement.element = null,
            this.ui_br_ext_previousElement.parentCount = 0
        }

        this.removeBugCoverEls();

    }

    removeBugCoverEls (){
        const els = document.querySelectorAll('.ui-br-ext-bug-cover')
            
        els.forEach(el => {
            el.remove()
        });
    }

    addClickToHtml (eventFunction: any){

        const html = document.getElementsByTagName('html')[0];

        html.addEventListener('mousedown', eventFunction, true);
        this.addClickBlocker();

        this.addHover();

    }

    removeClickFromBody (eventFunction: any){

        const html = document.getElementsByTagName('html')[0];

        html.removeEventListener('mousedown', eventFunction, true);

        this.removeClickBlocker();

        this.removeHover();

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

    /* Used arrow function to use this. */
    getMouseCoordinates = (event: any) => {

        if(event){
            const pageX = event.clientX;

            const pageY = event.clientY;

            this.findElementFromPoint(pageX, pageY);

        } 
        
    }

    findElementFromPoint (pageX: any, pageY: any){

        let element = document.elementFromPoint(pageX, pageY);

        const retainSelectedElement = document.elementFromPoint(pageX, pageY);

        if(element 
        && this.ui_br_ext_previousElement.element !== null
        && this.ui_br_ext_previousElement.parentCount < this.ui_br_ext_parentLimit 
        && element?.closest('#ui-br-ext-extension') === null
        ){

            // Previously selected element's top and left coordicates.
            const previousElementRect = this.ui_br_ext_previousElement.element.getBoundingClientRect();
            const previousElementTop = previousElementRect.top;
            const previousElementLeft = previousElementRect.left;

            // Currently selected element's top and left coordicates.
            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top;
            const elementLeft = elementRect.left;

            if(previousElementTop === elementTop && previousElementLeft === elementLeft){

                /**
                 * if selected element's parent is already outlined, then we outline the next parent (up to 5).
                 */
                let parentElement: any = null;
                let parentOutlined:any = false;

                for(let i=1; i<this.ui_br_ext_parentLimit; i++){

                    parentElement = parentElement !== null
                    ? parentElement.parentElement
                    : element.parentElement;

                    if(parentElement?.classList.contains('ui-br-ext-outlined-element')){
                        parentOutlined = true;
                        console.log(this.ui_br_ext_previousElement.parentCount);
                        
                        this.ui_br_ext_previousElement.parentCount ++;
                        break;
                    }

                }

                if(!parentOutlined){
                        console.log(this.ui_br_ext_previousElement.parentCount);
                    this.ui_br_ext_previousElement.parentCount ++;
                }

                element = parentOutlined
                ? parentElement.parentElement
                : element.parentElement;

            }

        }

        this.ui_br_ext_previousElement.element = retainSelectedElement;

        if(
            element?.tagName.toLocaleLowerCase() != 'body'
            && element?.tagName.toLocaleLowerCase() != 'html'
            && element?.closest('#ui-br-ext-extension') === null
        ){
                
            this.outlineSelectedElement(element);
            this.displayReportBugButton(true);
                //globalStore.store.selectedElement = element;
                //Used to crop dynamic elements
                //globalStore.store.selectedElementRect = element.getBoundingClientRect();
        }

        if(this.ui_br_ext_previousElement.parentCount === this.ui_br_ext_parentLimit){
            this.ui_br_ext_previousElement.element = null,
            this.ui_br_ext_previousElement.parentCount = 0
        }
    }

    /**
     * 
     * @param {boolean, true - enables a button, false - disbales a button} enable 
     */
    displayReportBugButton (enable: any){

        /* const reportBugButton = document.getElementById('ui-br-ext-report-bug-button');

        reportBugButton.style.display = enable 
        ? reportBugButton.classList.remove('ui-br-ext-report-bug-inactive') 
        : reportBugButton.classList.add('ui-br-ext-report-bug-inactive');   */  

    }

    /**
     * It styles the selected element by outlining it.
     * @param {selected element} element 
     */
    outlineSelectedElement (element: any) {

        // Remove outline from any previously selected elements.
        document.querySelectorAll('.ui-br-ext-outlined-element').forEach((element: any) => {
            element.classList.remove('ui-br-ext-outlined-element');
            element.style.cssText = element.style.cssText.replace('outline: red dashed 3px !important;', '');
            element.style.cssText = element.style.cssText.replace('outline: #4fff00 dashed 3px !important;', '');
            element.style.cssText = element.style.cssText.replace('outline: rgb(79, 255, 0) dashed 3px !important;', '');
        });

        element.classList.add('ui-br-ext-outlined-element');
        element.style.cssText = element.style.cssText + "outline: red dashed 3px !important;";

    }

    addClickBlocker (bodyChildren?: any) {
    if(!bodyChildren) {
        bodyChildren = document.querySelectorAll('body > *:not(#ui-br-ext-extension):not(script):not(noscript):not(style)')
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
        el.style.cssText = el.style.cssText.replace('outline: red dashed 3px !important;', '');
        el.style.cssText = el.style.cssText.replace('outline: #4fff00 dashed 3px !important;', '');
        el.style.cssText = el.style.cssText.replace('outline: rgb(79, 255, 0) dashed 3px !important;', '');
    });
    }

    preventClick = (event: any) => this.preventClickHandler(event);

    preventClickHandler = function(event: any) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    return false;
    }
}
