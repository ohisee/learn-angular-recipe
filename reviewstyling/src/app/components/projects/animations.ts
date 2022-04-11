import { trigger, state, style, transition, animate, keyframes, query, stagger } from "@angular/animations";

export const markedTrigger = trigger('markedState', [
  state('default-state', style({
    border: '1px solid black',
    backgroundColor: 'transparent',
    padding: '20px',
  })),
  state('marked-state', style({
    border: '2px solid blue',
    backgroundColor: '#b3e5fc',
    padding: '19px',
  })),
  transition('default-state => marked-state', [
    style({
      border: '2px solid black',
      padding: '19px',
      transform: 'scale(1)',
    }),
    animate('200ms ease-out', style({
      transform: 'scale(1.05)'
    })),
    animate(200), // need this animate(200) for smooth transform scale(1.05)
  ]),
  transition('marked-state => default-state', [
    style({
      border: '1px solid blue',
      padding: '20px',
    }),
    animate('300ms ease-out'),
  ]),
]);

export const itemStateTrigger = trigger('itemState', [
  // transition('void => *', []), or using alias :enter
  transition(':enter', [
    // ease-out starts fast and ends slow 
    animate('900ms ease-out', keyframes([
      style({
        opacity: 0,
        transform: 'translateX(-100%)',
        offset: 0,
      }),
      style({
        opacity: 1,
        transform: 'translateX(15%)',
        offset: 0.4,
      }),
      style({
        opacity: 1,
        transform: 'translateX(0)',
        offset: 1,
      }),
    ])),
  ]),
  transition(':leave', [
    animate('900ms ease-out', keyframes([
      style({
        opacity: 1,
        transform: 'translateX(0)',
      }),
      style({
        opacity: 1,
        transform: 'translateX(-15%)',
      }),
      style({
        opacity: 0,
        transform: 'translateX(100%)',
      }),
    ])),
  ]),
  transition('slid-up => slid-down', [
    style({
      transform: 'translateY(-100%)'
    }),
    animate('300ms ease-out', style({
      transform: 'translateY(0)'
    }))
  ]),
  transition('slid-down => slid-up', [
    style({
      transform: 'translateY(0)'
    }),
    animate('300ms ease-out', style({
      transform: 'translateY(-100%)'
    }))
  ]),
]);

export const slideStateTrigger = trigger('slideState', [
  transition(':enter', [
    style({
      transform: 'translateY(-100%)'
    }),
    animate('300ms ease-out', style({
      transform: 'translateY(0)'
    })),
  ]),
  transition(':leave', [
    style({
      transform: 'translateY(0)'
    }),
    animate('300ms ease-out', style({
      transform: 'translateY(-100%)'
    })),
  ]),
]);

export const listStateTrigger = trigger('listState', [
  // listen to any state change, 
  transition('* => *', [
    // ':enter' query for any new entering element 
    query(':enter', [
      // initial step
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      // first argument is initial delay,
      // second argument is animation for each new entering item
      stagger('300ms', [
        animate('500ms ease-out', keyframes([
          style({
            opacity: 1,
            transform: 'translateX(15%)',
            offset: 0.4,
          }),
          style({
            opacity: 1,
            transform: 'translateX(0)',
            offset: 1,
          }),
        ])),
      ]),
    ], { optional: true }),
  ]),
]);
