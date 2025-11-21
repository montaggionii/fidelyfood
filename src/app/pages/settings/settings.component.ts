import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonItem, IonLabel, IonInput, IonAvatar, IonToggle,
  IonContent, IonHeader, IonToolbar, IonTitle, IonList
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonAvatar,
    IonToggle,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList
  ]
})
export class SettingsComponent implements OnInit {
  userName = '';
  userEmail = '';
  userPhoto = '';
  language = 'es';
  darkMode = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userEmail = user.email || '';
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  changePhoto(event: any) {}
  changeProfile() {}
  changeLanguage() {}
  toggleDarkMode() {}
}