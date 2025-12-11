import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, NgIf],
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | undefined;
  isFavorite: boolean = false;

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurantService.getRestaurants().subscribe({
      next: (data: Restaurant[]) => {
        this.restaurant = data.find(r => r.id === id);
      },
      error: (err) => console.error('Error cargando restaurante', err)
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  bookTable() {
    alert('¡Reservar mesa funcionando!');
  }

  viewMenu() {
    alert('¡Ver menú funcionando!');
  }
}