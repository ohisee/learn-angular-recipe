import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  private subscription?: Subscription;

  constructor() { }

  public ngOnInit(): void {
    const customeIntervalObservable = new Observable<number>(
      (subscriber: Subscriber<number>) => {
        let count = 0;
        setInterval(() => {
          subscriber.next(count);
          if (count == 2) {
            // come to halt
            subscriber.complete();
          }
          count += 1;
        }, 1000);
      });

    this.subscription = customeIntervalObservable
      .pipe(
        filter((data: number) => {
          return data > 0;
        }),
        map((data: number) => {
          return `round ${data + 1}`;
        }))
      .subscribe({
        next: (data: string) => console.log('from complete', data),
        error: (err: any) => {
          console.log('from complete', err);
          alert(err.message);
        },
        complete: () => {
          console.log('from complete', 'completed');
        }
      });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
