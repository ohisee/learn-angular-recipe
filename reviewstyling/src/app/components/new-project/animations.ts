import { trigger, state, style, transition, animate, keyframes, group, query } from "@angular/animations";

export const buttonStateTrigger = trigger('buttonState', [
  state('valid-state', style({
    backgroundColor: 'lightgreen',
    borderColor: 'green',
    color: 'green',
  })),
  state('invalid-state', style({
    backgroundColor: 'red',
    borderColor: 'darkred',
    color: 'white',
  })),
  transition('invalid-state => valid-state', [
    group([
      animate('100ms', style({
        transform: 'scale(1.1)'
      })),
      animate('200ms', style({
        backgroundColor: 'lightgreen'
      })),
    ]),
    animate('200ms', style({
      transform: 'scale(1)'
    }))
  ]),
  transition('valid-state => invalid-state', [
    group([
      animate('100ms', style({
        transform: 'scale(1.1)'
      })),
      animate('200ms', style({
        backgroundColor: 'red'
      })),
    ]),
    animate('200ms', style({
      transform: 'scale(1)'
    }))
  ]),
]);

export const formStateTrigger = trigger('formState', [
  transition('* => *', [
    query('input.ng-invalid:focus', [
      animate('200ms', style({
        backgroundColor: 'red',
      })),
      animate('200ms'), // set background color back to original background color
    ], {optional: true}),
  ]),
]);
