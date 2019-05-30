import { Injectable } from '@angular/core';
import {AuthUser} from '../models/authentication/authuser';
import {BehaviorSubject, config, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiURL = 'http://localhost:8080/AuthenticationApp-1.0/rest/authuser/';
  private currentUserSubject: BehaviorSubject<AuthUser>;
  public currentUser: Observable<AuthUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthUser {
    return this.currentUserSubject.value;
  }

  register(username: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: username + ':' + password});
    const options = { headers };

    return this.http.post<any>(this.apiURL + 'register', null, options)
      .pipe(map(user => {
        // register successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      Authorization: username + ':' + password});
    const options = { headers };

    return this.http.post<any>(this.apiURL + 'login', null, options)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
