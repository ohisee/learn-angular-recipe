import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' }), included in providers array in main.ts file 
@Injectable()
export class AnalyticsService {
  
  registerClick(): void {
    console.log('Clicked!');
  }
}

