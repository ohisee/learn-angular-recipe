import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id?: number, name?: string } = {};

  private subscription?: Subscription;

  constructor(private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    // for initial load and no more additional changes
    let id = this.activatedRoute.snapshot.params['id'];
    let name = this.activatedRoute.snapshot.params['name'];
    this.user = { id, name };

    // async, for more route params changes
    this.subscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
