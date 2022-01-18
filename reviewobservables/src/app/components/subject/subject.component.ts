import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit, OnDestroy {
  text: string = '';

  private readonly unsubscibeSubject$: ReplaySubject<void> = new ReplaySubject(1);

  constructor() { }

  public ngOnInit(): void {
    interval(1000).pipe(takeUntil(this.unsubscibeSubject$)).subscribe((data: number) => {
      this.text = `from subject ${data}`;
      console.log(`from subject X ${data}`);
    });

    interval(1000).pipe(takeUntil(this.unsubscibeSubject$)).subscribe((data: number) => {
      console.log(`from subject Y ${data}`);
    });

    interval(1000).pipe(takeUntil(this.unsubscibeSubject$)).subscribe((data: number) => {
      console.log(`from subject Z ${data}`);
    });
  }

  public ngOnDestroy(): void {
    this.unsubscibeSubject$.next();
    this.unsubscibeSubject$.complete();
  }

}
