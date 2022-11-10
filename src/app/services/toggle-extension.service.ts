import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleExtensionService {

  constructor() { }

  toggle = new Subject<boolean>()

}
