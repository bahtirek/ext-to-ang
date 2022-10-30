import { Component, OnInit } from '@angular/core';
import { ActiveBtnService } from '../services/active-btn.service';

@Component({
  selector: 'app-extension',
  templateUrl: './extension.component.html',
  styleUrls: ['./extension.component.less']
})
export class ExtensionComponent implements OnInit {

  constructor(private activeBtnService: ActiveBtnService) { }

  activeBtn: string = '';

  ngOnInit(): void {
    this.activeBtnService.activeBtnObservable.subscribe(
      activeBtn => {
        this.activeBtn = activeBtn;
      }
    )
  }

}
