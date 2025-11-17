import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { TicketService } from '../../services/ticket.service';
import { UserService, } from '../../services/user.service';
import { ToastController } from '@ionic/angular';
import { Ticket } from 'src/models/ticket.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton,
    IonItem, IonList, IonLabel, IonSelect, IonSelectOption,
    CommonModule, FormsModule
  ]
})
export class TicketsPage implements OnInit {

  tickets: Ticket[] = [];
  nombre = '';
  descripcion = '';
  precio = 0;
  usuarios: User[] = [];
  usuarioSeleccionado?: User;

  constructor(
    private ticketService: TicketService,
    private userService: UserService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Suscribirse a los tickets
    this.ticketService.getTickets().subscribe(t => this.tickets = t);

    // Cargar usuarios desde backend
    this.userService.getUsers().subscribe(users => this.usuarios = users);
  }

  agregarTicket() {
    const nuevoTicket = new Ticket(
      this.tickets.length + 1,
      this.nombre,
      this.descripcion,
      this.precio,
      this.usuarioSeleccionado
    );

    this.ticketService.addTicket(nuevoTicket);

    // Limpiar campos
    this.nombre = '';
    this.descripcion = '';
    this.precio = 0;
    this.usuarioSeleccionado = undefined;

    this.mostrarToast('Ticket agregado ✅');
  }

  enviarTickets() {
    this.ticketService.sendTickets();
    this.mostrarToast('Tickets enviados 📤');
  }

  mostrarToast(mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 1500,
      position: 'top'
    }).then(toast => toast.present());
  }
}