import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';

type AccountType = {
  name: string,
  status: string,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  accounts: AccountType[] = [];

  constructor(private accountService: AccountService) {}

  public ngOnInit(): void {
    this.accounts = this.accountService.getAccounts();
  }
}
