import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-course-project',
  templateUrl: './course-project.component.html',
  styleUrls: ['./course-project.component.css'],
  animations: [
    trigger('routeState', [
      // rootPage => userPage
      transition('* => *', [
        group([
          query(':enter', [
            animateChild(),
            style({
              transform: 'translateY(-400px)',
              opacity: 0
            }),
            animate('300ms ease-out'),
          ], { optional: true }),
          query(':leave', [
            animate('300ms ease-out', style({
              transform: 'translateY(600px)',
              opacity: 0
            }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class CourseProjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Get route data from routing module routes
   * path: 'course-project', component: CourseProjectComponent, children: [
      { path: '', component: ProjectsComponent, data: {animation: {page: 'rootPage'}} },
      { path: 'users', component: UsersComponent, data: {animation: {page: 'userPage'}} },
    ]
   */
  getAnimationData(outlet: RouterOutlet): string {
    const routeData = outlet.activatedRouteData['animation'];
    if (!routeData) {
      return 'rootPage';
    }
    return routeData['page'];
  }
}
