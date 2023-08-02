import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { recipeAppReducers } from "./store";
import { AuthEffects } from './store/auth.effects';
import { RecipeEffects } from "./store/recipe.effects";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [ // cannot declare a component or directive twice in module
    AppComponent,
    HeaderComponent,
  ],
  imports: [ // can import module in multiple modules 
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(recipeAppReducers),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(), // for router navigation
    // AuthModule,    // use lazy loading, must remove from importing AuthModule
    // RecipesModule, // use lazy loading, must remove from importing RecipesModule
    SharedModule,
    // ShoppingListModule,  // use lazy loading, must remove from importing ShoppingListModule
    CoreModule, // Http interceptor,
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
