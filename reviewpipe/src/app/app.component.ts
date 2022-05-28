import { Component } from '@angular/core';
import { delay } from "rxjs/operators";
import { of } from "rxjs";

interface Server {
  instanceType: string;
  name: string;
  status: string;
  started: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  applicationStatusPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 2000);
  });

  applicationStatusObserable = of('stable').pipe(delay(1000));

  filteredStatus = '';

  servers: Server[] = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(),
    },
    {
      instanceType: 'medium',
      name: 'Production',
      status: 'stable',
      started: new Date(),
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(15, 1, 2017),
    },
    {
      instanceType: 'small',
      name: 'B Environment Server',
      status: 'stable',
      started: new Date(15, 1, 2017),
    }
  ];

  getStatusClasses(server: Server): {} {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }

  /**
   * Angular does not re-run pipe on the data when data changes. It is a preformance issue to 
   * re-calculate pipe whenever data changes.
   */
  onClickToAddServer(): void {
    this.servers.push({
      instanceType: 'small',
      name: 'abc',
      status: 'stable',
      started: new Date(),
    });
  }
}
