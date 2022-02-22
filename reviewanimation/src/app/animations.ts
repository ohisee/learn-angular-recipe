import { trigger, state, style, transition, animate, group, keyframes } from "@angular/animations";

export const clickedStateTrigger = trigger('clickedState', [
  state('default-initial-state', style({
    'background-color': 'orange',
    'width': '100px',
    'height': '100px',
  })),
  state('clicked-state', style({
    'background-color': 'blue',
    'width': '300px',
    'height': '50px',
  })),
  state('mousedown-state', style({
    backgroundColor: 'red',
    border: '1px solid black',
    height: '100px',
    width: '100px', // also need to set width and height, a new state does not keep styles of other states
  })),
  transition('default-initial-state => clicked-state', animate('1s 500ms ease-in')),
  transition('clicked-state => default-initial-state', animate(300)),
  transition('mousedown-state <=> clicked-state', animate('300ms ease-out')),
]);

export const showTextStateTrigger = trigger('showTextState', [
  // we don't really need this shown-state
  // styles for shown-state are defined in CSS
  // state('shown-state', style({ })),

  // void state is for elment is not attached to DOM 
  // * wildcard state is for any other state(s)
  transition('void => *', [
    // initial style for void state
    style({ opacity: 0 }), animate(300),
  ]),
  transition('* => void', animate(300, style({ opacity: 0 }))),
]);

// :enter is alias for void => * 
// :leave is alias for * => void
export const showTextStateEnterLeaveTrigger = trigger('showText', [
  transition(':enter', [
    // initial style for void state
    style({ opacity: 0 }), animate(300),
  ]),
  transition(':leave', animate(300, style({ opacity: 0 }))),
]);

export const animateStateTrigger = trigger('animateState', [
  transition('* => *', [
    animate('2000ms cubic-bezier(0.16, 0.78, 0, 0.92)', style({ width: 0 })),
    animate(1000, style({ width: '*' })) // wildcard for dynamic dimensional CSS property, like height, width
  ]),
]);

// demonstrate animation group
export const listStateTrigger = trigger('listState', [
  transition(':enter', [
    // initial style for void state
    style({
      opacity: 0,
      backgroundColor: '#fff',
    }),
    // group all animation together, start together simultaneously at the same time
    group([
      animate(1000, style({
        opacity: 0.7
      })),
      // animate(2000, style({
      //   backgroundColor: 'red'
      // })),
      animate('3000ms ease-out', keyframes([
        style({
          backgroundColor: '#fff',
          offset: 0 // at start
        }),
        style({
          backgroundColor: 'red',
          offset: 0.8
        }),
        style({
          backgroundColor: 'green',
          offset: 1
        }),
      ]))
    ]),
    animate(300, style({
      backgroundColor: 'lightblue',
    })),
  ]),
  transition(':leave', animate(300, style({ opacity: 0 }))),
]);
