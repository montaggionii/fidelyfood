import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonItem, IonLabel, IonHeader } from '@ionic/angular/standalone';

interface Ticket {
  id: number;
  restaurant: string;
  points: number;
  date: string; // ✅ Agregado para que *t.date* funcione
}

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
  standalone: true,
  imports: [IonHeader,
    CommonModule,
    IonContent, IonList, IonItem, IonLabel
  ],
})
export class PointsComponent implements OnInit {
  tickets: Ticket[] = [];

  ngOnInit() {
    this.tickets = [
      { id: 1, restaurant: 'Restaurante La Pasta', points: 50, date: '10/11/2025' },
      { id: 2, restaurant: 'Pizzería Bella', points: 120, date: '09/11/2025' },
      { id: 3, restaurant: 'Sushi Go', points: 30, date: '08/11/2025' },
    ];
  }
}
