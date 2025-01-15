import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { UserComponent } from "./components/user/user.component";
import { SharedModule } from "./components/shared/shared.module";
import { TasksModule } from "./components/tasks/tasks.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent], // non standalone components 
  bootstrap: [AppComponent],
  imports: [BrowserModule, SharedModule, TasksModule]
})
export class AppModule { }
