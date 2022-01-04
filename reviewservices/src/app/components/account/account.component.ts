import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string} = {name: '', status: ''};
  @Input() id: number = 0;

  constructor(private loggingService: LoggingService,
    private accountService: AccountService) {}

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    // this.loggingService.logStatusChange(status);
    this.accountService.statusUpdatedEvent.emit(status);
  }
}
