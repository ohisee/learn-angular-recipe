import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TasksService } from './components/tasks/tasks.service';

export const TasksServiceToken = new InjectionToken<TasksService>('tasks-service-token');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // TasksService 
    // register this service in providers and to indicate this should be injectable 
    // in application root environment injector 
    { provide: TasksServiceToken, useClass: TasksService }
  ]
};
