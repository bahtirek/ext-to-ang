import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.less']
})
export class CloseBtnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onMenuBtnClick(){
    const extension = document.getElementById("ui-br-ext-extension") as HTMLElement;
    extension.style.display = 'none';
  }

}
