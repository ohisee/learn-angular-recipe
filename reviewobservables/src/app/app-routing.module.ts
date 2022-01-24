import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteComponent } from './components/complete/complete.component';
import { ErrorComponent } from './components/error/error.component';

import { HomeComponent } from './components/home/home.component';
import { OperatorsComponent } from './components/operators/operators.component';
import { SubjectComponent } from './components/subject/subject.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'user/:id', component: UserComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'complete', component: CompleteComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'operators', component: OperatorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
