import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonInput, IonButton, IonLabel, IonItem, IonHeader,
  IonToolbar, IonTitle, IonContent, IonNote
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  imports: [
    IonNote,
    CommonModule,
    FormsModule,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  ]
})
export class AuthPage implements OnInit {

  email = '';
  password = '';
  confirmPassword = '';
  name = '';
  loading = false;
  errorMsg = '';
  isLoginMode = true;
  splash = true;

  nameTouched = false;
  emailTouched = false;
  passwordTouched = false;
  confirmTouched = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    setTimeout(() => this.splash = false, 1500);

    this.authService.user$.subscribe(user => {
      if (user) {
        const nombre = this.authService.getUserName(user);
        alert(`¡Hola, ${nombre}!`);
        this.router.navigate(['/tabs/home']);
      }
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMsg = '';
    this.nameTouched = false;
    this.emailTouched = false;
    this.passwordTouched = false;
    this.confirmTouched = false;
  }

  submit() {
    this.errorMsg = '';
    this.loading = true;

    if (this.isLoginMode) {
      // LOGIN
      this.authService.login({ email: this.email, password: this.password }).subscribe({
        next: (user: User) => {
          this.loading = false;
          const nombre = this.authService.getUserName(user);
          alert(`¡Hola, ${nombre}!`);
          this.router.navigate(['/tabs/home']);
        },
        error: err => {
          this.loading = false;
          this.errorMsg = err.message || 'Error al iniciar sesión';
        }
      });

    } else {
      // REGISTRO
      if (this.password !== this.confirmPassword) {
        this.errorMsg = 'Las contraseñas no coinciden';
        this.loading = false;
        return;
      }

      this.authService.register({
        name: this.name,
        email: this.email,
        password: this.password
      }).subscribe({
        next: (user: User) => {
          this.loading = false;
          const nombre = this.authService.getUserName(user);
          alert(`¡Bienvenido, ${nombre}!`);
          this.router.navigate(['/tabs/home']);
        },
        error: err => {
          this.loading = false;
          this.errorMsg = err.message || 'Error al crear cuenta';
        }
      });
    }
  }
}