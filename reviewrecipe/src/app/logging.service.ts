import { Injectable } from "@angular/core";

/** Demonstrate service inside modules */
@Injectable({providedIn: 'root'})
export class LoggingService {
  lastLog : string = '';

  printLog(message: string): void {
    console.log(message);
    console.log(this.lastLog);
    this.lastLog = message;
  }
}

