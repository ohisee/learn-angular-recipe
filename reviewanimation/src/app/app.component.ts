import { Component, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from "@angular/animations";
import { animateStateTrigger, clickedStateTrigger, listStateTrigger, showTextStateEnterLeaveTrigger, showTextStateTrigger } from "./animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    clickedStateTrigger,
    showTextStateTrigger,
    showTextStateEnterLeaveTrigger,
    animateStateTrigger,
    listStateTrigger,
    trigger('numberEnteredState', [
      // if there are some styles that are same in all states, put these styles in css stylesheet
      state('unselected', style({
        border: '1px solid black',
        padding: '5px',
        backgroundColor: 'transparent',
      })),
      state('selected', style({
        border: '2px solid blue',
        padding: '4px',
        backgroundColor: 'lightblue',
      })),
      transition('unselected => selected', [
        // array of steps
        // first step, instantly change these styles without any animation
        style({
          border: '2px solid black',
          padding: '4px',
          transform: 'scale(1)',
        }),
        // second step, passing style as second argument
        animate('600ms 100ms ease-out', style({
          backgroundColor: 'red',
          transform: 'scale(1.05)',
        })),
        // in between temporary style, no border and no padding
        // style({
        //   backgroundColor: 'red',
        // }),
        // need this animate to apply animation to background color 'red'
        animate(300),
      ]),
    ]),
  ],
})
export class AppComponent {
  animationState: string = 'default-initial-state';
  paragraphState: string = 'default-initial-state';
  numberEntered?: number;
  isShown: boolean = false;
  width: number = 420;
  animate: boolean = false;
  results: number[] = [];
  results2: number[] = [];

  @ViewChild('resultsContainer', { static: true }) container?: ElementRef;
  @ViewChild('results2Container', { static: true }) container2?: ElementRef;

  onClick(): void {
    this.animationState = 'clicked-state';
    setTimeout(() => {
      this.animationState = 'default-initial-state';
    }, 3000);
  }

  onMouseDown(): void {
    this.animationState = 'mousedown-state';
  }

  onParagraphClick(): void {
    this.paragraphState = 'clicked-state';
  }

  onInput(event: Event): void {
    this.numberEntered = +(event.target as HTMLInputElement).value;
  }

  onClickToAddElement(): void {
    this.results.push(Math.random());
    if (this.container) {
      (this.container.nativeElement as HTMLDivElement).scrollIntoView();
    }
  }

  onClickToAddElement2(): void {
    this.results2.push(Math.random());
    if (this.container2) {
      (this.container2.nativeElement as HTMLDivElement).scrollIntoView();
    }
  }

  onListStateAnimationStart(event: AnimationEvent): void {
    console.log(event);
  }

  onListStateAnimationDone(event: AnimationEvent) : void {
    console.log(event);
  }
}
