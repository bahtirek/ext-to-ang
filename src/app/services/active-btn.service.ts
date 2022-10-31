import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveBtnService {

  constructor() { }

  activeBtn: string = '';

  activeBtnSubject = new Subject<string>();

}
