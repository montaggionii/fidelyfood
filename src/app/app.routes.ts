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
    component: TabsComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'points', component: PointsComponent },
      { path: 'coupons', component: CouponsComponent },
      { path: 'map', component: MapComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' } // ruta por defecto
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' } // cualquier ruta desconocida
];