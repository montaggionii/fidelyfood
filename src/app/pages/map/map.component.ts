// src/app/pages/map/map.component.ts
import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

declare const google: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map!: google.maps.Map;

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    const mapElement = document.getElementById('map') as HTMLElement;
    const defaultLocation = { lat: 39.4699, lng: -0.3763 }; // Valencia

    this.map = new google.maps.Map(mapElement, {
      center: defaultLocation,
      zoom: 14,
    });

    // Intentar obtener la ubicación actual
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Centrar mapa y agregar marcador de usuario
          this.map.setCenter(userLocation);
          new google.maps.Marker({
            position: userLocation,
            map: this.map,
            title: 'Estás aquí 🧍‍♂️',
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            },
          });

          // Buscar restaurantes cercanos
          this.buscarRestaurantes(userLocation);
        },
        () => {
          console.warn('No se pudo obtener la ubicación.');
        }
      );
    } else {
      // Si no hay geolocalización, buscar restaurantes en el centro de Valencia
      this.buscarRestaurantes(defaultLocation);
    }
  }

  buscarRestaurantes(location: { lat: number; lng: number }) {
    const service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch(
      {
        location: location,
        radius: 2000, // 2 km
        type: ['restaurant'],
      },
      (results: any, status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((place: any) => {
            if (place.geometry?.location) {
              const marker = new google.maps.Marker({
                position: place.geometry.location,
                map: this.map,
                title: place.name,
                icon: {
                  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                },
              });

              // Crear ventana de información
              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div>
                    <h3>${place.name}</h3>
                    <p>${place.vicinity || ''}</p>
                  </div>
                `
              });

              marker.addListener('click', () => {
                infoWindow.open(this.map, marker);
              });
            }
          });
        } else {
          console.warn('No se encontraron restaurantes cerca.');
        }
      }
    );
  }
}