// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IonicModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
closeModal() {
throw new Error('Method not implemented.');
}
fakeScan() {
throw new Error('Method not implemented.');
}
qrContent: any;
points: any;
cerrar() {
throw new Error('Method not implemented.');
}
  constructor(private toastCtrl: ToastController) {}

  // Función de prueba que ya tenías
  async scanTicket() {
    const toast = await this.toastCtrl.create({
      message: '📸 Escaneo simulado: Ticket registrado con éxito',
      duration: 2000,
      color: 'success',
    });
    await toast.present();
  }
}
