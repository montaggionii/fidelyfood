// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { TabsComponent } from './pages/tabs/tabs.component';
import { HomeComponent } from './pages/home/home.component';
import { PointsComponent } from './pages/points/points.component';
import { CouponsComponent } from './pages/coupons/coupons.component';
import { MapComponent } from './pages/map/map.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: TabsComponent,  // Componente principal con la barra de tabs
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'points', component: PointsComponent },
      { path: 'coupons', component: CouponsComponent },
      { path: 'map', component: MapComponent },
      { path: 'settings', component: SettingsComponent },
      // Redirige a "home" si la ruta es vacía
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  // Redirige cualquier ruta no encontrada a la página principal con tabs
  { path: '**', redirectTo: '', pathMatch: 'full' }
];