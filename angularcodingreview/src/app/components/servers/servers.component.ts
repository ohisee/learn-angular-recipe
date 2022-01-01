import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>
  // `,
  templateUrl: "./servers.component.html",
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus: string = 'no server created';
  serverName: string = '';
  twoWayBindingServerName: string = 'initial name';
  serverCreated: boolean = false;
  servers: string[] = ['TestServer1', 'TestServer2'];
  logItem: number[] = [];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  public onCreateServer() {
    this.serverCreationStatus = 'Server created! Name is ' + this.twoWayBindingServerName;
    this.serverCreated = true;
    this.servers.push(this.twoWayBindingServerName);
    this.logItem.push(this.logItem.length + 1);
  }

  public onUpdateServerName(event: Event) {
    this.serverName = (event.target as HTMLInputElement).value;
  }

}
