import { Injectable } from '@angular/core';
import { Position } from '../interfaces/position.interface';

@Injectable({
  providedIn: 'root'
})
export class DragService {

  constructor() { }

  positions: Position = {
    clientX: 0,
    clientY: 0,
    movementX: 0,
    movementY: 0
  }

  onMouseDown (event: MouseEvent) {
    event.preventDefault();
    // get the mouse cursor position at startup:
    this.positions.clientX = event.clientX
    this.positions.clientY = event.clientY
    document.onmousemove = this.elementDrag
    document.onmouseup = this.closeDragElement
  }

  elementDrag = (event: MouseEvent) => {
      event.preventDefault();
      
      const draggableContainer = document.getElementById('ui-br-ext-extension')
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      // set the element's new position:
      if (event.clientY > 0 && event.clientY < window.innerHeight) {
          draggableContainer!.style.top = (draggableContainer!.offsetTop - this.positions.movementY) + 'px'
      }
      if (event.clientX > 0 && event.clientX < window.innerWidth){
          draggableContainer!.style.left = (draggableContainer!.offsetLeft - this.positions.movementX) + 'px'
      }
  }

  closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
      document.ontouchend = null
      document.ontouchmove = null
  }

  onTouchStart(event: any){   
      if(event.target.id == 'ui-br-ext-header') {
          event.preventDefault();
          event.stopPropagation();
          const touchevent = event.touches[0];
          this.positions.clientX = touchevent.clientX
          this.positions.clientY = touchevent.clientY
          document.ontouchmove = this.onTouchMove
          document.ontouchend = this.closeDragElement
      }            
  }

  onTouchMove = (event: TouchEvent) => {
      event.stopPropagation();
      let touchevent = event.touches[0];
      const draggableContainer = document.getElementById('ui-br-ext-extension')
      this.positions.movementX = this.positions.clientX - touchevent.clientX
      this.positions.movementY = this.positions.clientY - touchevent.clientY
      this.positions.clientX = touchevent.clientX
      this.positions.clientY = touchevent.clientY
      // set the element's new position:
      if (touchevent.clientY > 0 && touchevent.clientY < window.innerHeight) {
          draggableContainer!.style.top = (draggableContainer!.offsetTop - this.positions.movementY) + 'px'
      }
      if (touchevent.clientX > 0 && touchevent.clientX < window.innerWidth){
          draggableContainer!.style.left = (draggableContainer!.offsetLeft - this.positions.movementX) + 'px'
      }
  }

}
