// src/app/services/restaurant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  rating?: number;
  imageUrl?: string;
  description?: string;
  openingHours?: string;
  lat?: number;
  lng?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000/restaurants'; // apunta a tu backend

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }
}