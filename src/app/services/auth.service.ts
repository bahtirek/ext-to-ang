import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config } from '../interfaces/config.interface';
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

    auth(config: Config): Observable<Config> {
        const data = {
            RegistrationKey: config.registrationKey,
            UserEmail: config.userEmail,
            UserAppId: config.userAppId
        }
        return this.http.post<Config>(this.URL + '/get_config', data, )
        .pipe(retry(1), catchError(this.errorService.handleError));
    }

    verifyCode(config: Config, code: string){
        const data = {
            RegistrationKey: config.registrationKey,
            UserEmail: config.userEmail,
            UserAppId: config.userAppId,
            ConfirmationCode: code
        }
        return this.http.post<Config>(this.URL + '/confirm_user', data, )
        .pipe(retry(1), catchError(this.errorService.handleError));
    }
}
