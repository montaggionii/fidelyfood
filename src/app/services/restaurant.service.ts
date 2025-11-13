// src/app/services/restaurant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// src/app/services/restaurant.service.ts
export interface Restaurant {
  id: number;
  name: string;
  address: string;
  rating: number;
  imageUrl?: string;        // URL de la imagen del restaurante
  description?: string;     // breve descripción
  openingHours?: string;    // horario de apertura
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000/restaurants'; // apunta al backend

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }
}