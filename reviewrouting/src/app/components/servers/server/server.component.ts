import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server?: { id: number, name: string, status: string };

  private subscription?: Subscription;

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  public ngOnInit(): void {
    // get id from route snapshot
    let id = this.activatedRoute.snapshot.params['id'];
    id = +id; // convert to a number type
    this.server = this.serversService.getServer(id);

    // get id from additional changes
    this.subscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        let id = +params['id']; // convert to a number type
        this.server = this.serversService.getServer(id);
      }
    );

    // Or get data from resolver without get id from route (if use this approach, no need to include above)
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.server = data['server']; // 'server' must match the key defined in resolver property inside router module
      }
    );
  }

  public onClickToEdit(): void {
    // use relative route to go to edit page
    // queryParamsHandling to preserve query parameters in url, another value is merge for new parameters
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute, queryParamsHandling: 'preserve' });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
