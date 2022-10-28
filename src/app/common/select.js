import hoverOutline from './hover-outline';
import clickBlocker from './click-blocker';

// Global variable to hold previously clicked element properties.
let ui_br_ext_previousElement = {

    element : null,
    parentCount : 0

}

// Global variable that defines how many parents are included on repeated click on the same element.
const ui_br_ext_parentLimit = 5;

let currentElementInlineStyle = '';

const onSelect = function(){
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

    const style = document.createElement('style');

    style.setAttribute('id','ui-br-ext-extension-style');    

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = allPointerEvent+noHighlight;
    } else {
        style.appendChild(document.createTextNode(allPointerEvent+noHighlight));
    }
    addClickToHtml(getMouseCoordinates);
}

const onDeselect = function(){

    document.getElementById('ui-br-ext-extension-style')?.remove();

    removeClickFromBody(getMouseCoordinates);
    
    // Remove outline from any previously selected elements.
    document.querySelectorAll('.ui-br-ext-outlined-element').forEach(element => {
        element.classList.remove('ui-br-ext-outlined-element');
        element.style.cssText = element.style.cssText.replace('outline: red dashed 3px !important;', '');
        element.style.cssText = element.style.cssText.replace('outline: #4fff00 dashed 3px !important;', '');
        element.style.cssText = element.style.cssText.replace('outline: rgb(79, 255, 0) dashed 3px !important;', '');
        element.removeAttribute('data-ext-index');
    });

    // Reset the global variable that holds the previously selected element properties.
    // Used to calculte element's parent.
    if(ui_br_ext_previousElement){
        ui_br_ext_previousElement.element = null,
        ui_br_ext_previousElement.parentCount = 0
    }

    // Disabling the "Report Bug" button if select operator is turned off.
    displayReportBugButton(false);

    removeBugCoverEls();

}

const removeBugCoverEls = function(){
    const els = document.querySelectorAll('.ui-br-ext-bug-cover')
        
    els.forEach(el => {
        el.remove()
    });
}

const addClickToHtml = function(eventFunction){

    const html = document.getElementsByTagName('html')[0];

    html.addEventListener('mousedown', eventFunction, true);
    clickBlocker.addClickBlocker();

    hoverOutline.addHover();

}

const removeClickFromBody = function(eventFunction){

    const html = document.getElementsByTagName('html')[0];

    html.removeEventListener('mousedown', eventFunction, true);

    clickBlocker.removeClickBlocker();

    hoverOutline.removeHover();

}

const getMouseCoordinates = function(event){

    if(event){
        const pageX = event.clientX;

        const pageY = event.clientY;

        findElementFromPoint(pageX, pageY);

    } 
    
}

const findElementFromPoint = function(pageX, pageY){

    let element = document.elementFromPoint(pageX, pageY);

    const retainSelectedElement = document.elementFromPoint(pageX, pageY);

    if(element 
       && ui_br_ext_previousElement.element !== null
       && ui_br_ext_previousElement.parentCount < ui_br_ext_parentLimit 
       && element?.closest('#ui-br-ext-extension') === null
       ){

        // Previously selected element's top and left coordicates.
        const previousElementRect = ui_br_ext_previousElement.element.getBoundingClientRect();
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
            let parentElement = null;
            let parentOutlined = false;

            for(let i=1; i<ui_br_ext_parentLimit; i++){

                parentElement = parentElement !== null
                ? parentElement.parentElement
                : element.parentElement;

                if(parentElement?.classList.contains('ui-br-ext-outlined-element')){
                    parentOutlined = true;
                    ui_br_ext_previousElement.parentCount ++;
                    break;
                }

            }

            if(!parentOutlined){
                ui_br_ext_previousElement.parentCount ++;
            }

            element = parentOutlined
            ? parentElement.parentElement
            : element.parentElement;

        }

    }

    ui_br_ext_previousElement.element = retainSelectedElement;
    if(
        element?.tagName.toLocaleLowerCase() != 'body'
        && element?.tagName.toLocaleLowerCase() != 'html'
        && element?.closest('#ui-br-ext-extension') === null
        ){
            
            outlineSelectedElement(element);
            displayReportBugButton(true);
            //globalStore.store.selectedElement = element;
            //Used to crop dynamic elements
            //globalStore.store.selectedElementRect = element.getBoundingClientRect();
    }

    if(ui_br_ext_previousElement.parentCount === ui_br_ext_parentLimit){
        ui_br_ext_previousElement.element = null,
        ui_br_ext_previousElement.parentCount = 0
    }
}

/**
 * It styles the selected element by outlining it.
 * @param {selected element} element 
 */
const outlineSelectedElement = function(element){

    // Remove outline from any previously selected elements.
    document.querySelectorAll('.ui-br-ext-outlined-element').forEach(element => {
        element.classList.remove('ui-br-ext-outlined-element');
        element.style.cssText = element.style.cssText.replace('outline: red dashed 3px !important;', '');
        element.style.cssText = element.style.cssText.replace('outline: #4fff00 dashed 3px !important;', '');
        element.style.cssText = element.style.cssText.replace('outline: rgb(79, 255, 0) dashed 3px !important;', '');
    });

    element.classList.add('ui-br-ext-outlined-element');
    element.style.cssText = element.style.cssText + "outline: red dashed 3px !important;";

}
/**
 * 
 * @param {boolean, true - enables a button, false - disbales a button} enable 
 */
const displayReportBugButton = function(enable){

    /* const reportBugButton = document.getElementById('ui-br-ext-report-bug-button');

    reportBugButton.style.display = enable 
    ? reportBugButton.classList.remove('ui-br-ext-report-bug-inactive') 
    : reportBugButton.classList.add('ui-br-ext-report-bug-inactive');   */  

}


/**
 * Gets the xpath of an outlined/selected element.
 * @param {selected/outlined element} element 
 * @returns xpath of outlined/selected element.
 */
const getElementXpath = function(elm){
    
    const mainRect = elm.getBoundingClientRect();
    let allNodes = document.getElementsByTagName('*'); 
    let segs = [];
    let sib;
    let xpath = null;
    let id = null;
    for (; elm && elm.nodeType == 1; elm = elm.parentNode) 
    { 
        let breakParent = false;

        if (elm.hasAttribute('id')) { 


            for (let i=0; i < allNodes.length; i++) { 
                
                // Once next parent with ID is found, relative xpath is constructed based on that parent.
                if (allNodes[i].hasAttribute('id') && allNodes[i].id == elm.id){
                    segs.unshift('//*[@id="' + elm.getAttribute('id') + '"]');
                    xpath =  segs.join('/') ?? null;
                    breakParent = true;
                    id = true;
                    break; 
                }  
            }
             
        } else { 
            let i;
            for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
                if (sib.localName == elm.localName){
                    i++;
                }  
            } 
                segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
        } 

        if(elm.localName.toLowerCase() === 'html' || breakParent){
            break;
        }
    } 

    if (xpath == null) {
        xpath =  segs.length ? '/' + segs.join('/') : null;
    } 
    
    if(id) {
        const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if(result && result.snapshotLength > 1) {
            for(let i = 0; i < result.snapshotLength; i++) {
                const node = result.snapshotItem(i);
                const rect = node.getBoundingClientRect();
                if (mainRect.left == rect.left && mainRect.right == rect.right) {
                    xpath = `(${xpath})[${i+1}]`;
                    break;
                }
            }
        }
    }

    return xpath;   
}



export {
    getElementXpath,
    displayReportBugButton,
    outlineSelectedElement,
    findElementFromPoint,
    getMouseCoordinates,
    removeClickFromBody,
    addClickToHtml,
    onDeselect,
    onSelect,
    ui_br_ext_previousElement,
    ui_br_ext_parentLimit
}