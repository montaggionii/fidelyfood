import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonProgressBar,
  IonList, IonItem, IonLabel,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent
} from '@ionic/angular/standalone';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonProgressBar,
    IonList, IonItem, IonLabel,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    AsyncPipe
  ]
})
export class HomeComponent implements OnInit {

  // Usuario simulado
  user$ = of({ email: 'montaggioni29@gmail.com' });

  totalPoints = 120;
  totalPointsMax = 500;
  totalPointsProgress = this.totalPoints / this.totalPointsMax;

  favorites = [
    {
      name: 'Restaurante A',
      address: 'Calle 123',
      currentPoints: 40,
      totalPoints: 100,
      icon: 'restaurant-outline',
      image: 'https://via.placeholder.com/300x150',
      nextReward: 'Descuento 10%'
    },
    {
      name: 'Restaurante B',
      address: 'Av. Principal',
      currentPoints: 70,
      totalPoints: 150,
      icon: 'fast-food-outline',
      image: 'https://via.placeholder.com/300x150',
      nextReward: 'Postre gratis'
    }
  ];

  tips = ['Tip 1', 'Tip 2', 'Tip 3'];

  constructor() {}

  ngOnInit() {}

  logout() {
    console.log('Usuario cerró sesión');
  }

  scanTicket() {
    console.log('Escanear ticket');
  }
}