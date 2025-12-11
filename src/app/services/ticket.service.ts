// src/app/services/ticket.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Ticket } from 'src/models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets: Ticket[] = [];
  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);

  constructor() {}

  // Devuelve un observable de los tickets
  getTickets(): Observable<Ticket[]> {
    return this.ticketsSubject.asObservable();
  }

  // Agrega un ticket y emite la actualización
  addTicket(ticket: Ticket): Observable<Ticket> {
    this.tickets.push(ticket);
    this.ticketsSubject.next(this.tickets);
    return of(ticket);
  }

  // Envía (resetea) los tickets
  sendTickets(): void {
    console.log('Tickets enviados:', this.tickets);
    this.tickets = [];
    this.ticketsSubject.next(this.tickets);
  }
}