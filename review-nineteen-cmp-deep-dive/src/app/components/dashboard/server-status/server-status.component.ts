import { AfterViewInit, Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, AfterViewInit {
  currentStatus: 'online' | 'offline' | 'unknown' = 'offline';

  readonly currentStatusSignal = signal<'online' | 'offline' | 'unknown'>('offline');

  private interval?: ReturnType<typeof setInterval>;

  // alternative to ngOnDestroy
  private destoryRef = inject(DestroyRef);

  constructor() {
    // setup subscription to signal and clean up after 
    effect(() => {
      console.log(this.currentStatusSignal());
    });

    // effect onCleanup function  
    effect((onCleanup) => {
      const timer = setTimeout(() => {
        console.log('Current number of tasks');
      }, 1000);

      onCleanup(() => {
        console.log('On clean up');
        clearTimeout(timer);
      });
    });
  }

  ngOnInit(): void {
    console.log('On init');
    // this.interval = setInterval(...)

    const interval = setInterval(() => {
      const rnd = Math.random(); // 0 - 0.999999999

      if (rnd < 0.5) {
        this.currentStatus = 'online';
        this.currentStatusSignal.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus = 'offline';
        this.currentStatusSignal.set('offline');
      } else {
        this.currentStatus = 'unknown';
        this.currentStatusSignal.set('unknown');
      }

    }, 1000);

    // alternative to implementing ngOnDestroy
    this.destoryRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  ngAfterViewInit(): void {
    console.log('After view init');
  }

  // ngOnDestroy(): void {
  //   if (this.interval) {
  //     clearTimeout(this.interval);
  //   }
  // }
}
