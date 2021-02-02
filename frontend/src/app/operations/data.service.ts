import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) {}

  myUrl = 'http://127.0.0.1:5000/board';
  myUrl2 = 'http://127.0.0.1:5000/chart';

  getOperation(): Observable<any>{
    return this.httpClient.get(this.myUrl);
  }

  getMontant(): Observable<any>{
    return this.httpClient.get(this.myUrl2);
  }
}
