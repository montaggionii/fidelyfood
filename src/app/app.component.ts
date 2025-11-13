import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [IonicModule]
})
export class AppComponent {
  constructor(private toastCtrl: ToastController) {}

  async scanTicket() {
    const toast = await this.toastCtrl.create({
      message: '📸 Escaneo simulado: Ticket registrado con éxito',
      duration: 2000,
      color: 'success',
    });
    await toast.present();
  }
}