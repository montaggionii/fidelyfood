import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonInput, IonButton, IonLabel, IonItem,
  IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    IonContent
  ]
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  loading = false;
  errorMsg = '';
  splash = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Splash inicial
    setTimeout(() => (this.splash = false), 1500);

    // Si ya hay usuario logueado, ir directo a tabs/home
    this.authService.user$.subscribe(user => {
      if (user) this.router.navigate(['/tabs/home']);
    });
  }

  login() {
    this.errorMsg = '';
    this.loading = true;

    // Llamada al backend real (Firebase)
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: user => {
        this.loading = false;
        // Guardar usuario en localStorage si quieres
        localStorage.setItem('user', JSON.stringify(user));
        // Redirigir a tabs/home
        this.router.navigate(['/tabs/home']);
      },
      error: err => {
        this.loading = false;
        this.errorMsg = err.message || 'Error al iniciar sesión';
      }
    });
  }