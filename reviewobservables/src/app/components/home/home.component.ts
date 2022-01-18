/**
 * @fileoverview home component containing observables
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;

  constructor() { }
  
  // a new observable is created when this component is initialized (not good)
  // so there will be multiple observable created 
  // must unsubscribe to prevent this error
  public ngOnInit(): void {
    // fire a new value every counter
    this.subscription = interval(1000).subscribe((count: number) => {
      console.log('from home', count);
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
