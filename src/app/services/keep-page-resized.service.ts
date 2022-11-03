import { Injectable } from '@angular/core';
import { Pages, PageSize } from '../interfaces/pageSize.interface';

@Injectable({
  providedIn: 'root'
})
export class KeepPageResizedService {

  constructor() { }

  pages: Pages = {
    uiBrExtReport: {},
    uiBrExtReview: {},
    uiBrExtSettings: {},
    uiBrExtVideo: {},
  }

}


