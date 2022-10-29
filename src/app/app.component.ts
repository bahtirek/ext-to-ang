import { Component } from '@angular/core';
import { OnclickService } from './services/onclick.service';

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

    this.select.onSelect()
  }
}
