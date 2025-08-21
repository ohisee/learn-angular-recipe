import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import type { Ticket } from './ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {

  tickets: Ticket[] = [];

  public onAddTicket(ticketData: { title: string, text: string }): void {

    const { title, text } = ticketData;

    if (title && text) {
      const ticket: Ticket = {
        title: ticketData.title,
        request: ticketData.text,
        id: Math.random().toString(),
        status: 'open'
      };

      this.tickets.push(ticket);
    }
  }

  public onCloseTicket(id: string): void {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === id) {
        return { ...ticket, status: 'closed' };
      }
      return ticket;
    });
  }
}
