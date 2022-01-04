/**
 * @fileoverview service
 */
import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

 type AccountType = {
  name: string,
  status: string,
};

@Injectable({providedIn: 'root'})
export class AccountService {
  accounts: AccountType[] = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdatedEvent = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) {}

  public addAccount(name: string, status: string): void {
    this.accounts.push({name, status});
    this.loggingService.logStatusChange(status);
  }

  public updateStatus(id: number, status: string) {
    if (this.accounts[id]) {
      this.accounts[id].status = status;
      this.loggingService.logStatusChange(status);
    }
  }

  public getAccounts(): AccountType[] {
    return this.accounts;
  }

}
