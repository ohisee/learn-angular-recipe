import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [ // cannot declare a component or directive twice in module
    AppComponent,
    HeaderComponent,
  ],
  imports: [ // can import module in multiple modules 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // AuthModule,    // use lazy loading, must remove from importing AuthModule
    // RecipesModule, // use lazy loading, must remove from importing RecipesModule
    SharedModule,
    // ShoppingListModule,  // use lazy loading, must remove from importing ShoppingListModule
    CoreModule, // Http interceptor
  ],
  // moved to core module ts file 
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: AuthInterceptorService,
  //   multi: true,
  // }],
  bootstrap: [AppComponent],
})
export class AppModule { }

