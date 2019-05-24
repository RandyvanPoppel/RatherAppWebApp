import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {

  private apiURL = 'http://localhost:51572/RatherApp-1.0/rest/comparison/';

  constructor(private httpclient: HttpClient) {
  }

  getLatestComparisons(unixTimeStamp: string): Observable<any> {
    if (unixTimeStamp == null || typeof unixTimeStamp === 'undefined') {
      unixTimeStamp = String(new Date().getTime());
    }
    return this.httpclient.get(this.apiURL + 'getLatest', {
      params: new HttpParams().set('unixTimeStamp', unixTimeStamp)
    });
  }
}
