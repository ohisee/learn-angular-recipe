import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  server?: { id: number, name: string, status: string };
  serverName: string = '';
  serverStatus: string = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  private subscriptionQuery?: Subscription;
  private subscriptionFragment?: Subscription;

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  public ngOnInit(): void {
    // snapshot when this component is initialized
    this.activatedRoute.snapshot.queryParams;
    this.activatedRoute.snapshot.fragment;

    // react to additional changes in route after this component is initialized
    this.subscriptionQuery = this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.allowEdit = params['allowEdit'] === '1' ? true : false;
      }
    );
    this.subscriptionFragment = this.activatedRoute.fragment.subscribe();

    // need to get the id from router params and subscription 
    this.server = this.serversService.getServer(3);
    if (this.server) {
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    }
  }

  public onUpdateServer(): void {
    if (this.server) {
      this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
      this.changesSaved = true;
      this.router.navigate(['../'], { relativeTo: this.activatedRoute }); // go up one level to last loaded server
    }
  }

  public ngOnDestroy(): void {
    this.subscriptionQuery?.unsubscribe();
    this.subscriptionFragment?.unsubscribe();
  }

  /**
   * if any changes are made and nagivate away withou saving, show a confirm dialog box
   */
  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server?.name || this.serverStatus !== this.server.status)
      && !this.changesSaved) {
      return confirm('Do you want to discard the changes');
    } else {
      return true;
    }
  }

}
