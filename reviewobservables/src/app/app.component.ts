import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './components/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated: boolean = false;
  private sub?: Subscription;
  private subscription?: Subscription;

  constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.sub = this.userService.activatedEmitter.subscribe((data: boolean) => {
      this.userActivated = data;
    });

    this.subscription = this.userService.subject$.subscribe((data: boolean) => {
      this.userActivated = data;
    });
  }

  public ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.subscription?.unsubscribe();
  }

}
