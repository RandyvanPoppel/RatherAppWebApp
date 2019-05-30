import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthUser} from '../models/authentication/authuser';

@Injectable({ providedIn: 'root' })
export class UserService {

  private apiURL = 'http://localhost:8080/AuthenticationApp-1.0/rest/user/';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<AuthUser[]>(this.apiURL + 'all');
  }

  getById(id: number) {
    return this.http.get<AuthUser>(this.apiURL + '?userId=' + id);
  }
}
