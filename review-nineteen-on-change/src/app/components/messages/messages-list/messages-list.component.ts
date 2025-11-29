import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  // imports: [AsyncPipe],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnInit {
  // messages = input.required<string[]>();

  private messagesService: MessagesService = inject(MessagesService);

  private changeDetectorRef = inject(ChangeDetectorRef);

  private destroyRef = inject(DestroyRef);

  // use async pipe here, so that no need to subscribe and unsubscribe in ngOnInit 
  readonly messages$ = this.messagesService.messages$;

  // use signal is no problem for trigger change detection ss
  readonly messages = this.messagesService.allMessages;

  // does not trigger change detection here because there is no input change 
  // get messages() {
  //   return this.messagesService.allMessagesNoSignal;
  // }

  // messages: string[] = [];

  public ngOnInit(): void {
    // const subscription = this.messagesService.messages$.subscribe((messages: string[]) => {
    //   this.messages = messages;
    //   // tell angular this component should be checked for changes 
    //   this.changeDetectorRef.markForCheck();
    // });

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
