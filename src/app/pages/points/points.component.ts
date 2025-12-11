// src/app/pages/points/points.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { TicketService } from '../../services/ticket.service';
import { UserService, AllUsers, UserData } from '../../services/user.service';
import { Ticket } from 'src/models/ticket.model';

interface UserDisplay {
  uid: string;
  nombre: string;
  email: string;
  puntos: number;
}

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonList, IonItem, IonLabel, IonButton]
})
export class PointsComponent implements OnInit {

  tickets: Ticket[] = [];
  users: UserDisplay[] = [];

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
      next: (data: Ticket[]) => this.tickets = data,
      error: (err: any) => console.error('Error al cargar tickets', err)
    });
  }

  addTestTicket() {
    if (this.users.length === 0) return;

    const newTicket = new Ticket(
      this.tickets.length + 1,
      'Ticket de prueba',
      'Descripción de prueba',
      50,
      this.users[0] // ahora es UserDisplay, compatible con tu modelo Ticket
    );

    this.ticketService.addTicket(newTicket).subscribe({
      next: () => this.loadTickets(),
      error: (err: any) => console.error('Error al crear ticket', err)
    });
  }

  // ========================
  // Usuarios
  // ========================
  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data: AllUsers[]) => {
        // 🔹 Mapeamos AllUsers a UserDisplay
        this.users = data.map(u => ({
          uid: u.uid,
          nombre: u.data.name || 'Sin nombre',
          email: u.data.email || 'Sin email',
          puntos: u.data.points || 0
        }));
      },
      error: (err: any) => console.error('Error al cargar usuarios', err)
    });
  }

  async addTestUser() {
    const uid = 'usuarioTest_' + new Date().getTime(); // generar UID temporal
    const userData: UserData = {
      favorites: [],
      points: 0,
      tips: [],
      email: 'test@correo.com',
      name: 'Usuario Test'
    };

    try {
      await this.userService.createUser(uid, userData);
      console.log('Usuario creado correctamente');
      this.loadUsers(); // recargar lista
    } catch (err: any) {
      console.error('Error al crear usuario', err);
    }
  }
}