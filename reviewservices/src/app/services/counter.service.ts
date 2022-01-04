/**
 * @fileoverview service
 */
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService {
  activeToInactiveCounter: number = 0;
  inactiveToActiveCounter: number = 0;

  public incrementActiveToInactive() {
    this.activeToInactiveCounter += 1;
    console.log(this.activeToInactiveCounter);
  }

  public incrementInactiveToActive() {
    this.inactiveToActiveCounter += 1;
    console.log(this.inactiveToActiveCounter);
  }
  
}
