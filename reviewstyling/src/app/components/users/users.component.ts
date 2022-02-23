import { Component, HostBinding, OnInit } from '@angular/core';
import { routeFadeStateTrigger, routeSlideStateTrigger } from '../shared/route-animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [routeFadeStateTrigger, routeSlideStateTrigger]
})
export class UsersComponent implements OnInit {

  // use host binding to bind animation trigger
  // @HostBinding('@routeFadeState') routerAnimation = true;
  @HostBinding('@routeSlideState') routerAnimation = true;

  constructor() { }

  ngOnInit(): void {
  }

}
