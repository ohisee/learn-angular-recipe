import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messagesSignal = signal<string[]>([]);

  readonly allMessages = this.messagesSignal.asReadonly();

  // this is a problem in change detection when not using signal 
  private messagesNoSignal: string[] = [];
  get allMessagesNoSignal() {
    return [...this.messagesNoSignal];
  }

  // use rxjs behavior subject 
  public readonly messages$ = new BehaviorSubject<string[]>([]);

  public addMessage(message: string): void {
    this.messagesSignal.update((prevMessages) => [...prevMessages, message]);

    this.messagesNoSignal = [...this.messagesNoSignal, message];

    this.messages$.next([...this.messagesNoSignal]);
  }

}
