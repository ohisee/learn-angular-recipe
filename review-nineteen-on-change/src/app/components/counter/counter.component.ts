import { ChangeDetectionStrategy, Component, computed, inject, NgZone, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // when this is a change in this component or in any of its child components, trigger change detection
})
export class CounterComponent implements OnInit {
  count = signal(0);

  message = computed(() => 'Counter ' + this.count());

  // opt out zone.js watch mode 
  // private zone = inject(NgZone);
  // remove zone.js from angular.json and add provideExperimentalZonelessChangeDetection in app.config.ts

  public ngOnInit(): void {
    setTimeout(() => {
      this.count.set(0);
    }, 5000);

    // will not trigger change detection  
    // this.zone.runOutsideAngular(() => {
    setTimeout(() => {
      console.log('---------------------- on init');
    }, 5600);
    // });
  }

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
