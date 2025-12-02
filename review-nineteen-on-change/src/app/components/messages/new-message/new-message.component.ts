import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // when this is a change in this component or in any of its child components, trigger change detection
})
export class NewMessageComponent {
  // add = output<string>();
  enteredText = signal('');

  private messagesService: MessagesService = inject(MessagesService);

  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    // this.add.emit(this.enteredText());
    this.messagesService.addMessage(this.enteredText());
    this.enteredText.set('');
  }
}
