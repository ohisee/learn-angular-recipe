/**
 * @fileoverview service
 */
import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable({ providedIn: "root" })
export class UserService {
  activeUsers: string[] = ['walker', 'talker'];
  inactiveUsers: string[] = ['runner', 'jake'];

  constructor(private counterService: CounterService) {}

  public setToActive(id: number) {
    if (this.inactiveUsers[id]) {
      this.activeUsers.push(this.inactiveUsers[id]);
      this.inactiveUsers.splice(id, 1);
      this.counterService.incrementInactiveToActive();
    }
  }

  public setToInactive(id: number) {
    if (this.activeUsers[id]) {
      this.inactiveUsers.push(this.activeUsers[id]);
      this.activeUsers.splice(id, 1);
      this.counterService.incrementActiveToInactive();
    }
  }

}
