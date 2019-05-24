import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ComparisonComponent } from './comparison/comparison.component';

const routes: Routes = [
  { path: '', component: ComparisonComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
