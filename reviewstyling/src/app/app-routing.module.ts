import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseProjectComponent } from './components/course-project/course-project.component';
import { IntroToStyleComponent } from './components/intro-to-style/intro-to-style.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CssTransitionDemoComponent } from './components/transition/css-transition-demo.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: IntroToStyleComponent, pathMatch: 'full' },
  {
    path: 'course-project', component: CourseProjectComponent, children: [
      { path: '', component: ProjectsComponent, data: {animation: {page: 'rootPage'}} },
      { path: 'users', component: UsersComponent, data: {animation: {page: 'userPage'}} },
    ]
  },
  { path: 'transition', component: CssTransitionDemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
