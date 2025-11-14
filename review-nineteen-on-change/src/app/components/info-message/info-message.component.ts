import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-info-message',
  standalone: true,
  imports: [],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoMessageComponent {

  inputMsg = input.required<string>();

  get debugOutput() {
    const random = Math.random();
    console.log(`[InfoMessages] "debugOutput" binding re-evaluated. ${random}`);
    return `InfoMessage Component Debug Output`;
  }

  onLog() {
    console.log('Clicked!');
  }
}
