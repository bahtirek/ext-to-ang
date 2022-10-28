import { Component } from '@angular/core';
// @ts-ignore
/* import * as select from "./common/select"; */
import { OnclickService } from './onclick.service';

@Component({
  selector: 'ez-bug-ext',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor (private select: OnclickService){}
  title = 'extension';
  clicked() {
    console.log("clicked");
    const el = document.getElementById('myButton')
    console.log(this.title);
    // @ts-ignore
    this.select.onSelect()
  }
}
