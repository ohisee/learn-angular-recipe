import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ObservableService } from './observable.service';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit, OnDestroy {
  message: string = '';
  serverMessage: string = '';
  errorOccurred: boolean = false;

  private subscription?: Subscription;

  constructor(
    private readonly observableService: ObservableService) { }

  public ngOnInit(): void {
  }

  public onClickSwitchMap(): void {
    this.errorOccurred = false;
    console.log(`server message is ${this.message}`);
    this.subscription = this.observableService.stringToNumber(this.message).subscribe({
      next: (value: number) => this.serverMessage = `from server: ${value}`,
      error: (err: any) => {
        this.errorOccurred = true;
        this.serverMessage = `error : ${err.message}`;
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
