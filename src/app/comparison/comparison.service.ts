import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Choice} from '../models/choice';

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

  vote(comparisonId, choiceId) {
    const params = '?comparisonId=' + comparisonId + '&choiceId=' + choiceId;
    return this.httpclient.post(this.apiURL + 'vote' + params, null
    );
  }

  createComparison(choicesInMemory: Choice[]) {
    let params = '';
    choicesInMemory.forEach((choice, index) => {
      if (index === 0) {
        params = '?';
      } else {
        params += '&';
      }
      params += 'choiceDescriptions=' + choice.description;
    })
    return this.httpclient.post(this.apiURL + 'add' + params, null
    );
  }
}
