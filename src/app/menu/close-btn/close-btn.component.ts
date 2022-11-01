import { Component, OnInit } from '@angular/core';
import { OnclickService } from 'src/app/services/onclick.service';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.less']
})
export class CloseBtnComponent implements OnInit {

  constructor(private onClick: OnclickService) { }

  ngOnInit(): void {
  }

  onMenuBtnClick(){
    this.onClick.onDeselect();
    const extension = document.getElementsByTagName("ez-bug-ext")[0] as HTMLElement;
    extension.style.display = 'none';
  }

}
