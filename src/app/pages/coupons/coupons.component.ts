import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';

interface Coupon {
  restaurant: string;
  reward: string;
  redeemed: boolean;
}

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
})
export class CouponsComponent implements OnInit {
  coupons: Coupon[] = [];

  ngOnInit() {
    this.coupons = [
      { restaurant: 'Restaurante La Pasta', reward: 'Postre gratis', redeemed: false },
      { restaurant: 'Pizzería Bella', reward: '20% de descuento', redeemed: true },
    ];
  }
}