import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from 'src/app/app.component';
import { AnalyticsService } from 'src/app/components/shared/analytics.service';
import { AppRoutingModule } from './app/app-routing.module';

// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    AnalyticsService, // provide service globally 
    importProvidersFrom(AppRoutingModule),
  ] 
});
