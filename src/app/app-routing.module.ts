import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ComparisonComponent } from './comparison/comparison.component';
import {RegistrationComponent} from './registration/registration.component';
import {AuthenticationGuard} from './authentication/authentication.guard';
import {LoginComponent} from './login/login.component';
import {ChatComponent} from './chat/chat.component';

const routes: Routes = [
  { path: '', component: ComparisonComponent, canActivate: [AuthenticationGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
