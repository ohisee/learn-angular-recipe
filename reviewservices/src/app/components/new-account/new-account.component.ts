import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent implements OnDestroy {

  subscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    private accountService: AccountService) {
      this.subscription = this.accountService.statusUpdatedEvent.subscribe(
        (status: string) => alert('New status: ' + status)
      );
    }
    
    public onCreateAccount(accountName: string, accountStatus: string) {
      this.accountService.addAccount(accountName, accountStatus);
      // this.loggingService.logStatusChange(accountStatus);
    }

    public ngOnDestroy(): void {
     this.subscription.unsubscribe();
    }
}
