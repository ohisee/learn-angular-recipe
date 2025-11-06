import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // remove zone.js because we are using signal which is good for change detection 
    // in angular.json, architect -> build -> polyfills[], remove zone.js 
    provideExperimentalZonelessChangeDetection(),
  ]
};
