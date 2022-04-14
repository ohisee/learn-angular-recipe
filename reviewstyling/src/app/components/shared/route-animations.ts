import { trigger, state, style, transition, animate, keyframes, group, animation, useAnimation } from "@angular/animations";

// create re-usable animation
const fadeAnimation = animation([
  style({
    opacity: '{{ startOpacity }}'
  }),
  animate('{{ duration }}')
], {params: {startOpacity: 0, duration: '100ms'}});

export const routeFadeStateTrigger = (params: {[key: string]: number | string}) => trigger('routeFadeState', [
  transition(':enter', [
    // style({
    //   opacity: 0
    // }),
    // animate('300ms')
    useAnimation(fadeAnimation, {params: params})
  ]),
  transition(':leave', animate('300ms', style({
    opacity: 0
  }))),
]);

export const routeSlideStateTrigger = trigger('routeSlideState', [
  transition(':enter', [
    style({
      transform: 'translateY(-100%)',
      opacity: 0,
    }),
    animate('300ms')
  ]),
  transition(':leave', animate('300ms', style({
    transform: 'translateY(100%)',
    opacity: 0,
  }))),
]);
