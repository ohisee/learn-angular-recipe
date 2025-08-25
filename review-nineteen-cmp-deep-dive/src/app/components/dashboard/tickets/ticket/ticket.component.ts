import { Component, input, output, signal } from '@angular/core';
import type { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  // configuration object data = input.required<Ticket>({alias: 'ticket', transform: (value) => {}});
  data = input.required<Ticket>();

  // close = output({alias: 'closeTicket'});
  close = output();

  readonly detailsVisible = signal<boolean>(false);

  public onToggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update((oldDetailsVisibleValue) => !oldDetailsVisibleValue);
  }

  public onMarkAsCompleted(): void {
    this.close.emit();
  }
}
