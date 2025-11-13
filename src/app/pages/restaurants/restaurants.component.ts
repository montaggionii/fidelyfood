import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // <--- Importante para [routerLink]
import { RestaurantService, Restaurant } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, NgForOf], // <-- Asegúrate de agregar RouterModule
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    console.log('Intentando cargar restaurantes...');
    this.restaurantService.getRestaurants().subscribe({
      next: (data: Restaurant[]) => {
        console.log('Datos recibidos del backend:', data); // Para depuración
        this.restaurants = data;
      },
      error: (err) => console.error('Error cargando restaurantes', err)
    });
  }
}