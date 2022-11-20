import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Account } from '../interfaces/account.interface';
import { Environment } from '../interfaces/environment.interface';
import { HandleErrorService } from './handleError.service';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(private http: HttpClient, private errorService: HandleErrorService) { }

    environment: any;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    getEnvironments(account: Account, query: string): Observable<any> {
        
        let params = new HttpParams();
        params = params.append("registrationKey", account.registrationKey);
        params = params.append("token", account.token!);
        params = params.append("uuid", account.uuid!);
        params = params.append("query", query);
        

        return this.http.get<any>(`${account.repositoryServer}/environment`, { params: params })
        .pipe(retry(1), catchError(this.errorService.handleError));
    }
  
}
