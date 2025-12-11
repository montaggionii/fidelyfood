import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonButton, IonLabel, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonText } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText
  ]
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.errorMsg = '';
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMsg = 'Completa todos los campos';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Las contraseñas no coinciden';
      return;
    }

    this.auth.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => this.errorMsg = err.message || 'Error al crear la cuenta'
    });
  }
}