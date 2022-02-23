import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoalComponent } from './components/goal/goal.component';
import { QuoteComponent } from './components/quote/quote.component';
import { AuthorComponent } from './components/author/author.component';
import { IntroToStyleComponent } from './components/intro-to-style/intro-to-style.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersComponent } from './components/users/users.component';
import { CourseProjectComponent } from './components/course-project/course-project.component';
import { FormsModule } from '@angular/forms';
import { CssTransitionDemoComponent } from './components/transition/css-transition-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    GoalComponent,
    QuoteComponent,
    AuthorComponent,
    IntroToStyleComponent,
    NewProjectComponent,
    ProjectComponent,
    ProjectsComponent,
    UsersComponent,
    CourseProjectComponent,
    CssTransitionDemoComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
