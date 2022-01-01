import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ServerElementsType, ServerType } from '../models/server.model';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit, AfterViewInit {
  @Output() serverAdd = new EventEmitter<ServerType>();
  @Output() blueprintAdd = new EventEmitter<ServerType>();

  @ViewChild('serverDescriptionInput', {static: true}) serverDescriptionInput?: ElementRef;

  serverElements: ServerElementsType[] = [];
  newServerName: string = '';
  newServerContent: string = '';

  constructor() { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    // in ViewChild, included {static: true}
  }

  public onAddServerButtonClick(serverNameInput: HTMLInputElement) {
    this.serverAdd.emit({
      // serverName: this.newServerName,
      serverName: serverNameInput.value,
      serverContent: this.newServerContent,
      serverDescription: this.serverDescriptionInput?.nativeElement.value
    });
  }

  public onAddBlueprintButtonClick(serverNameInput: HTMLInputElement) {
    this.blueprintAdd.emit({
      // serverName: this.newServerName,
      serverName: serverNameInput.value,
      serverContent: this.newServerContent,
      serverDescription: this.serverDescriptionInput?.nativeElement.value
    });
  }
}
