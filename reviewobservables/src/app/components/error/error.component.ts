import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;

  constructor() { }

  public ngOnInit(): void {
    const customeIntervalObservable = new Observable<number>(
      (subscriber: Subscriber<number>) => {
        let count = 0;
        setInterval(() => {
          subscriber.next(count);
          if (count > 3) {
            // when error occurs, there will be no more observable triggered
            // it cancels this observable, will not complete
            subscriber.error(new Error('error from error'));
          }
          count += 1;
        }, 1000);
      });

    this.subscription = customeIntervalObservable.subscribe({
      next: (data: number) => console.log('from error', data),
      error: (err: any) => {
        console.log('from error', err);
        alert(err.message);
      },
      complete: () => {
        console.log('from error', 'complete');
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
