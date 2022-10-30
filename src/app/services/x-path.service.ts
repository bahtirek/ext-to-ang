import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XPathService {

  constructor() { }

    /**
   * Gets the xpath of an outlined/selected element.
   * @param {selected/outlined element} element 
   * @returns xpath of outlined/selected element.
   */
  getElementXpath = function(elm: any){
      
    const mainRect = elm.getBoundingClientRect();
    let allNodes = document.getElementsByTagName('*'); 
    let segs = [];
    let sib;
    let xpath: any = null;
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
                const node: any = result.snapshotItem(i);
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
}
