import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Account } from '../interfaces/account.interface';
import { HandleErrorService } from './handleError.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient, private errorService: HandleErrorService) { }

    URL = 'https://extension-auth.evendor.app/api';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    auth(account: Account): Observable<Account> {
        const data = {
            RegistrationKey: account.registrationKey,
            UserEmail: account.userEmail,
            UserAppId: account.userAppId
        }
        return this.http.post<Account>(this.URL + '/get_config', data, this.httpOptions)
        .pipe(retry(1), catchError(this.errorService.handleError));
    }

    verifyCode(account: Account, code: string){
        const data = {
            RegistrationKey: account.registrationKey,
            UserEmail: account.userEmail,
            UserAppId: account.userAppId,
            ConfirmationCode: code
        }
        return this.http.post<Account>(this.URL + '/confirm_user', data, )
        .pipe(retry(1), catchError(this.errorService.handleError));
    }
}
