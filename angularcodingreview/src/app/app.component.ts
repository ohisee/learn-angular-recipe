import { Component } from '@angular/core';
import { ServerElementsType, ServerType } from './components/models/server.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // styles: [
  //   `
  //     h3 {
  //       color: #9900ff;
  //     },
  //   `
  // ]
})
export class AppComponent {
  title: string = 'review-first-app';
  name: string = "walker";

  numbers = [1, 2, 3, 4, 5];
  oddNumbers: number[] = [1, 3, 5];
  evenNumbers: number[] = [2, 4];
  onlyOdd: boolean = false;
  value: number = 10;

  serverElements: ServerElementsType[] = [{
    type: 'server',
    name: 'TestServer',
    content: 'just a test',
  }];

  public onServerAdded(event: ServerType) {
    this.serverElements.push({
      type: 'server',
      name: event.serverName,
      content: event.serverContent + ' ' + event.serverDescription,
    });
  }

  public onBlueprintAdded(event: ServerType) {
    this.serverElements.push({
      type: 'blueprint',
      name: event.serverName,
      content: event.serverContent + ' ' + event.serverDescription,
    });
  }
}
