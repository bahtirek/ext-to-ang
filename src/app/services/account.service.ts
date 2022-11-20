import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Account } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  accountSource = new Subject<boolean>()

  account: Account = {userEmail: '', userAppId: '', registrationKey: ''}
  
}
