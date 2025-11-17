// src/app/pages/points/points.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { TicketService } from '../../services/ticket.service';
import { UserService } from '../../services/user.service';
import { Ticket } from 'src/models/ticket.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonList, IonItem, IonLabel, IonButton]
})
export class PointsComponent implements OnInit {
  tickets: Ticket[] = [];
  users: User[] = [];

  constructor(
    private ticketService: TicketService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadTickets();
    this.loadUsers();
  }

  // ========================
  // Tickets
  // ========================
  loadTickets() {
    this.ticketService.getTickets().subscribe({
      next: (data) => this.tickets = data,
      error: (err) => console.error('Error al cargar tickets', err)
    });
  }

  addTestTicket() {
    if (this.users.length === 0) return;

    const newTicket = new Ticket(
      this.tickets.length + 1,
      'Ticket de prueba',
      'Descripción de prueba',
      50,
      this.users[0]
    );

    this.ticketService.addTicket(newTicket).subscribe({
      next: () => this.loadTickets(),
      error: (err) => console.error('Error al crear ticket', err)
    });
  }

  // ========================
  // Usuarios
  // ========================
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  addTestUser() {
    const newUser: User = { nombre: 'Usuario Test', email: 'test@correo.com' };
    this.userService.createUser(newUser).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Error al crear usuario', err)
    });
  }
}