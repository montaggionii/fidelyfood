import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class MapComponent implements OnInit, AfterViewInit {

  restaurants: Restaurant[] = [];
  map!: google.maps.Map;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    // Cargar los restaurantes desde backend
    this.loadRestaurants();
  }

  ngAfterViewInit() {
    // Inicializar el mapa
    this.initMap();
  }

  initMap() {
    const defaultLocation = { lat: 39.4699, lng: -0.3763 }; // Valencia centro

    const mapElement = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapElement, {
      center: defaultLocation,
      zoom: 14,
    });

    // Intentar centrar en la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.map.setCenter(userLocation);

          // Marker del usuario
          new google.maps.Marker({
            position: userLocation,
            map: this.map,
            title: 'Estás aquí 🧍‍♂️',
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            },
          });

          // Agregar markers de restaurantes
          this.addMarkers();
        },
        () => {
          console.warn('No se pudo obtener la ubicación, mostrando Valencia.');
          this.addMarkers();
        }
      );
    } else {
      // Sin geolocalización, mostrar Valencia y restaurantes
      this.addMarkers();
    }
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data;
        // Si el mapa ya está inicializado, agregar los markers
        if (this.map) this.addMarkers();
      },
      error: (err) => console.error('Error al cargar restaurantes', err)
    });
  }

  addMarkers() {
    if (!this.map || !this.restaurants.length) return;

    this.restaurants.forEach(r => {
      if (!r.lat || !r.lng) return; // Asegurarse de que tenga coordenadas

      const marker = new google.maps.Marker({
        position: { lat: r.lat, lng: r.lng },
        map: this.map,
        title: r.name
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h3>${r.name}</h3>
            <p>${r.address}</p>
            ${r.description ? `<p>${r.description}</p>` : ''}
            ${r.openingHours ? `<p>Horario: ${r.openingHours}</p>` : ''}
          </div>
        `
      });

      marker.addListener('click', () => infoWindow.open(this.map, marker));
    });
  }
}