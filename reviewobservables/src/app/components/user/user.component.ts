import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id?: number;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    )
  }

  public onClickToActivate(): void {
    this.userService.activatedEmitter.emit(true);
  }

  // recommanded to use subject, no event emitter, for cross component communication through service
  public onClickToDeactivate(): void {
    this.userService.subject$.next(false);
  }

}
