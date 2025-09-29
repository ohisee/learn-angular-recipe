import { Injectable } from "@angular/core";

// check injector tree in browser's angular DevTools 
@Injectable({ providedIn: 'root' })
export class LoggingService {

  public log(message: string): void {
    const timeStampe = new Date().toLocaleDateString();
    console.log(`[${timeStampe}]: ${message}`);
  }
}
