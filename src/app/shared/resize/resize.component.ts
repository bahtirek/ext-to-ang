import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.less']
})
export class ResizeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() pageId = '';
  
  positions: any = {};
  element: any;

  onMouseDown (event: any) {
      event.preventDefault();
      this.element = document.getElementById(this.pageId);
      
      this.positions.width = this.element.getBoundingClientRect().width;
      this.positions.height = this.element.getBoundingClientRect().height;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      this.positions.element = this.element;
      console.log(event.clientX, event.clientY);
      
      document.onmousemove = this.setInitialSize;
      document.onmouseup = this.closeElementResize;
  }
  
  onTouchStart (event: any) {
      event.preventDefault();
      event.stopPropagation();
      const touchevent = event.touches[0];
      this.positions.width = this.element.getBoundingClientRect().width;
      this.positions.height = this.element.getBoundingClientRect().height;
      this.positions.clientX = touchevent.clientX;
      this.positions.clientY = touchevent.clientY;
      //this.positions.element = this.element;
      document.ontouchmove = this.onTouchResize;
      document.ontouchend = this.closeElementResize;
      this.element = undefined;
  }

  setInitialSize = (event: any) => {
      event.preventDefault();
      this.positions.resizeX = this.positions.width + (event.clientX - this.positions.clientX - 20);
      if(this.positions.resizeX > 300) {
          this.positions.element.style.width = this.positions.resizeX + 'px'
      }
      this.positions.resizeY = this.positions.height + (event.clientY - this.positions.clientY - 20);
      if(this.positions.resizeY > 80) {
          this.positions.element.style.height = this.positions.resizeY + 'px'
      }
  }

  onTouchResize = (event: any) => {
      //event.preventDefault();
      const touchevent = event.touches[0];
      this.positions.resizeX = this.positions.width + (touchevent.clientX - this.positions.clientX);
      if(this.positions.resizeX > 250 && this.positions.resizeX < 330) {
          this.positions.element.style.width = this.positions.resizeX + 'px'
      }
      this.positions.resizeY = this.positions.height + (touchevent.clientY - this.positions.clientY);
      if(this.positions.resizeY > 200) {
          this.positions.element.style.height = this.positions.resizeY + 'px'
      }
  }

  closeElementResize = () => {
      document.onmouseup = null
      document.onmousemove = null
      document.ontouchend = null
      document.ontouchmove = null
  }

}
