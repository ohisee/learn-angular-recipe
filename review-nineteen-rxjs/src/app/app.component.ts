import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  readonly clickCount = signal<number>(0); // signal always has initial value 

  readonly clickCount$ = toObservable(this.clickCount);

  readonly interval$ = interval(1000); // Observable has no initial value 

  // autumatically clean up Observable subscription 
  readonly intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  readonly customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    const intervalId = setInterval(() => {
      // subscriber.error();
      if (timesExecuted > 3) {
        clearInterval(intervalId);
        subscriber.complete();
        return;
      }
      console.log('Emitting a new value');
      subscriber.next({ message: 'New value' }); // emit a new value every 2 seconds
      timesExecuted += 1;
    }, 2000);
  });

  private destroyRef = inject(DestroyRef);

  constructor() {
    // for signal 
    effect(() => {
      console.log(`Clicked button ${this.clickCount()} times`);
    });
  }

  public ngOnInit(): void {
    // must subscribe observable
    const subscription = interval(1000).pipe(
      map((val) => val * 2) // operator 
    ).subscribe({
      next: (val) => {
        // console.log(val);
      },
      complete: () => { },
      error: () => { }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      console.log('destroy ref');
    });

    const subscription2 = this.clickCount$.subscribe((val) => {
      console.log(`Clicked signal button ${val} time(s)`);
    });

    this.destroyRef.onDestroy(() => {
      subscription2.unsubscribe();
    });

    const subscription3 = this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('completed'),
      error: (err) => console.log(err)
    });

    this.destroyRef.onDestroy(() => {
      subscription3.unsubscribe();
    });
  }

  public onClick(): void {
    this.clickCount.update(prevCount => prevCount + 1);
  }
}
