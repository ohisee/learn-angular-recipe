import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message = '';
  @Output() close = new EventEmitter<void>();

  constructor() { }

  onClickToClose(): void {
    this.close.emit();
  }
}
