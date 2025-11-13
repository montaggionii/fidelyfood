// src/app/services/favorites.service.ts
import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private storageKey = 'favorites';

  getFavorites(): Restaurant[] {
    const favs = localStorage.getItem(this.storageKey);
    return favs ? JSON.parse(favs) : [];
  }

  addFavorite(restaurant: Restaurant) {
    const favs = this.getFavorites();
    if (!favs.find(r => r.id === restaurant.id)) {
      favs.push(restaurant);
      localStorage.setItem(this.storageKey, JSON.stringify(favs));
    }
  }

  removeFavorite(restaurant: Restaurant) {
    const favs = this.getFavorites().filter(r => r.id !== restaurant.id);
    localStorage.setItem(this.storageKey, JSON.stringify(favs));
  }
}