import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ElementService } from './element.service';
import { HoverAndClickService } from './hover-and-click.service';
import { SelectedElementsService } from './selected-elements.service';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

    constructor(private elementService: ElementService, private hoverClickService: HoverAndClickService, private selectedElementService: SelectedElementsService) { }

    isElementSelected = new Subject<boolean>();

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

    onDeselect (removeSelectedOutline: boolean) {

        document.getElementById('ui-br-ext-extension-style')?.remove();

        this.removeClickFromBody(this.getMouseCoordinates);
        
        // Remove outline from any previously selected elements.
        if(removeSelectedOutline) {
            document.querySelectorAll('.ui-br-ext-outlined-element').forEach((element: any) => {
                element.classList.remove('ui-br-ext-outlined-element');
            });
            document.querySelectorAll('.ui-br-ext-outlined-element-selected').forEach((element: any) => {
                element.classList.remove('ui-br-ext-outlined-element-selected');
                element.removeAttribute('ez-bug-selected-label')
            });
            document.querySelectorAll('.ez-bug-element-label').forEach((element: any) => {
                element.remove()
            });
        } else {
            document.querySelectorAll('.ui-br-ext-outlined-element').forEach((element: any) => {
                element.classList.remove('ui-br-ext-outlined-element');
            });
        }

        // Remove outline from any previously hovered elements.
        
        document.querySelectorAll('.ui-br-ext-hovered').forEach((element: any) => {
            element.classList.remove('ui-br-ext-hovered');
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
        this.hoverClickService.addClickBlocker();

        this.hoverClickService.addHover();

    }

    removeClickFromBody (eventFunction: any){

        const html = document.getElementsByTagName('html')[0];

        html.removeEventListener('mousedown', eventFunction, true);

        this.hoverClickService.removeClickBlocker();

        this.hoverClickService.removeHover();

    }

    /* Used arrow function to use this. */
    getMouseCoordinates = (event: any) => {

        if(event){
            

            this.findElementFromPoint(event);

        } 
        
    }

    findElementFromPoint (event: any): boolean | void {

        const pageX = event.clientX;

        const pageY = event.clientY;

        let element = document.elementFromPoint(pageX, pageY);

        const retainSelectedElement = document.elementFromPoint(pageX, pageY);

        if(element && event.shiftKey && element.hasAttribute('ez-bug-selected-label')) {
            element.classList.remove('ui-br-ext-outlined-element-selected');
            this.selectedElementService.removeSelection(element.getAttribute('ez-bug-selected-label'));
            return false
        }
        
        if(!event.shiftKey && element
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
                        
                        this.ui_br_ext_previousElement.parentCount ++;
                        break;
                    }

                }

                if(!parentOutlined){
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
                
            this.outlineSelectedElement(element, event);
            this.elementService.activeElement = element;
            

            //this.displayReportBugButton(true);
        }

        if(this.ui_br_ext_previousElement.parentCount === this.ui_br_ext_parentLimit){
            this.ui_br_ext_previousElement.element = null,
            this.ui_br_ext_previousElement.parentCount = 0
        }
    }

    /**
     * It styles the selected element by outlining it.
     * @param {selected element} element 
     */
    outlineSelectedElement (element: any, event: any) {

        // Remove outline from any previously selected elements.
        
        document.querySelectorAll('.ui-br-ext-outlined-element').forEach((element: any) => {
            element.classList.remove('ui-br-ext-outlined-element');
        });

        if(!element.classList.contains('ez-bug-element-label')){
            element.classList.add('ui-br-ext-outlined-element');
            this.selectedElementService.lastSelectedElement = element;
            /* Needed to show/hide label input */
            this.isElementSelected.next(true)
        }
    }
    
}
