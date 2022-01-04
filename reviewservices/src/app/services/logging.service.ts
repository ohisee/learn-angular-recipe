/**
 * @fileoverview service
 */
import { Injectable } from "@angular/core";

@Injectable()
export class LoggingService {
  public logStatusChange(status: string): void {
    console.log('A server status changed, new status: ', status);
  }
}
