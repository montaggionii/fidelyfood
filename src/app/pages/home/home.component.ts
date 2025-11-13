import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonProgressBar,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';

interface FavoriteRestaurant {
  id: number;
  name: string;
  address: string;
  nextReward: string;
  currentPoints: number;
  totalPoints: number;
  icon: string;
  image: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonProgressBar,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class HomeComponent implements OnInit {
  favorites: FavoriteRestaurant[] = [];
  tips: string[] = [];
  totalPoints = 0;
  totalPointsMax = 0;
  totalPointsProgress = 0;

  ngOnInit() {
    this.favorites = [
      {
        id: 1,
        name: 'Café Sol',
        address: 'Calle Principal 123',
        nextReward: '10 cafés = 1 gratis',
        currentPoints: 70,
        totalPoints: 100,
        icon: 'cafe-outline',
        image: '/assets/cafe-sol.jpg',
        color: '#8B4513'
      },
      {
        id: 2,
        name: 'Barbería Flash',
        address: 'Avenida Central 45',
        nextReward: '5 cortes = 1 gratis',
        currentPoints: 40,
        totalPoints: 50,
        icon: 'cut-outline',
        image: '/assets/barberia-flash.jpg',
        color: '#A9A9A9'
      },
      {
        id: 3,
        name: 'Restaurante La Pasta',
        address: 'Plaza Mayor 7',
        nextReward: 'Descuento 20% en tu cumpleaños',
        currentPoints: 150,
        totalPoints: 200,
        icon: 'restaurant-outline',
        image: '/assets/restaurante-la-pasta.jpg',
        color: '#C0392B'
      },
      {
        id: 4,
        name: 'Gimnasio Fit',
        address: 'Calle Deportiva 22',
        nextReward: 'Clase gratis cada 10 visitas',
        currentPoints: 80,
        totalPoints: 100,
        icon: 'fitness-outline',
        image: '/assets/gimnasio-fit.jpg',
        color: '#DAA520'
      }
    ];

    this.tips = [
      '💡 Acumula puntos escaneando tus tickets.',
      '🎁 Canjea tus recompensas antes de que expiren.',
      '🔥 Visita más seguido y desbloquea premios secretos.'
    ];

    this.totalPoints = this.favorites.reduce((sum, r) => sum + r.currentPoints, 0);
    this.totalPointsMax = this.favorites.reduce((sum, r) => sum + r.totalPoints, 0);
    this.totalPointsProgress = this.totalPoints / this.totalPointsMax;
  }

  scanTicket() {
    console.log('📷 Escanear QR activado');
  }
}