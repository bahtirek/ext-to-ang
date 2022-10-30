import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveBtnService {

  constructor() { }

  activeBtn: string = '';

  activeBtnSource = new Subject<string>();

  activeBtnObservable = this.activeBtnSource.asObservable();

}
