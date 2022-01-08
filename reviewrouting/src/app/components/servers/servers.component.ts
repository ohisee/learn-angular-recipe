import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: { id: number, name: string, status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.servers = this.serversService.getServers();
  }

  public onClick(): void {
    // relative path 'servers', include a relativeTo route, 
    // for example, relative to root router /servers, navigate to host/servers/servers
    this.router.navigate(['servers'], { relativeTo: this.activatedRoute });
  }
}
