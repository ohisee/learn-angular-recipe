import { Component } from '@angular/core';
import { animate, AnimationBuilder, group, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('cardState', [
      transition(':enter', [
        group([
          // style({
          //   opacity: 0,
          //   transform: 'translateX(100%)'
          // }),
          // animate(300),
          // ':self' selector selects the element which has this trigger, 
          // for this simple project, it is the div element with @cardState
          query(':self', [
            style({
              opacity: 0,
            }),
            animate('1000ms'),
          ]),
          query('div.card-header', [
            style({
              transform: 'translateY(-100%)',
              opacity: 0,
            }),
            animate('300ms')
          ]),
          query('div.card-body', [
            style({
              transform: 'translateX(-100%)',
              opacity: 0,
            }),
            animate('300ms')
          ]),
          query('div.card-footer', [
            style({
              transform: 'translateY(300px)',
              opacity: 0,
            }),
            animate('300ms')
          ]),
        ])
      ]),
      transition(':leave', [
        animate(200, style({
          transform: 'translateX(-100%)',
          opacity: 0
        }))
      ]),
      transition('* => *', [
        query(':enter', [
          style({
            transform: 'scale(1)'
          }),
          animate('1000ms', style({
            transform: 'scale(2.0)'
          })),
          animate('100ms'),
        ], { optional: true }), //optional means selecting one element that may not may exist
        // query('div p, button' ...) combine query selector
        query('div p, button', [
          animate('300ms', style({
            color: 'red',
          })),
          animate('300ms'),
        ]),
      ]),
    ])
  ]
})
export class AppComponent {
  showPanel: boolean = false;
  showParagraph: boolean = true;

  constructor(private animationBuilder: AnimationBuilder) {

  }

  animate(element: HTMLDivElement) {
    const animation = this.animationBuilder.build([
      style({
        backgroundColor: 'red',
        width: '200ms',
      }),
      animate('300ms', style({
        width: '500px',
      })),
      // return to original state, animate back
      animate('200ms')
    ]);

    const player = animation.create(element);
    player.play();
  }
}
