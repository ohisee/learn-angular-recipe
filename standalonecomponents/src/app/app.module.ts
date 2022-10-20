import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
// import { SharedModule } from './components/shared/shared.module';
// import { DetailsComponent } from './components/welcome/details/details.component';

// This app module is not needed anymore for standalong component

@NgModule({
  declarations: [
    // AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // SharedModule, // commented out because shared module is only used by details standalong component
    // DetailsComponent, // add all standalone components in imports 
    WelcomeComponent,
  ],
  providers: [],
  bootstrap: [
    // AppComponent // included bootstrapApplication in main.ts file, no need for this app module 
  ]
})
export class AppModule { }

