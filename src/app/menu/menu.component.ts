import { Component, OnInit } from '@angular/core';
import { DragService } from '../services/drag.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  constructor(private drugService: DragService) { }

  ngOnInit(): void {
  }

  onTouchStart(event: any){
    this.drugService.onTouchStart(event);
  }

  onMouseDown(event: MouseEvent) {
    this.drugService.onMouseDown(event);
  }

}
