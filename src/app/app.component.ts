import { Component } from '@angular/core';
import {AuthUser} from './models/authentication/authuser';
import {AuthenticationService} from './authentication/authentication.service';
import {first} from 'rxjs/operators';
import {UserService} from './authentication/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'RatherAppWebApp';

  currentUser: AuthUser;
  userFromApi: AuthUser;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
      this.userFromApi = user;
    });
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
