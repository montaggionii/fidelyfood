import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // para ngModel

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [IonicModule, FormsModule], // 🔑 Muy importante
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  notificationsEnabled = true;
  darkMode = false;
  language = 'es';

  toggleTheme() {
    this.darkMode = !this.darkMode;
    console.log('Tema oscuro:', this.darkMode);
  }

  cerrarSesion() {
    console.log('Cerrar sesión');
  }
}