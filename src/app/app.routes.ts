import { Routes } from '@angular/router';
import { TabsComponent } from './pages/tabs/tabs.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then(m => m.AuthPage)
  },

  {
    path: 'tabs',
    component: TabsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'points',
        loadComponent: () => import('./pages/points/points.component').then(m => m.PointsComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'coupons',
        loadComponent: () => import('./pages/coupons/coupons.component').then(m => m.CouponsComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'map',
        loadComponent: () => import('./pages/map/map.component').then(m => m.MapComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
        canActivate: [AuthGuard]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' }
];