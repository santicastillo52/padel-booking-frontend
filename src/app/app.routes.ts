import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Dashboard - Landing Page
  {
    path: '',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  
  // Auth Module - Ruta base
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  
  //Users Module - Ruta base
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
 
  // Clubs Module - Ruta base
  {
    path: 'clubs',
    loadChildren: () => import('./features/clubs/clubs.module').then(m => m.ClubsModule),
    canActivate: [AuthGuard]
  },
  
  // Courts Module - Ruta base
  {
    path: 'courts',
    loadChildren: () => import('./features/courts/courts.module').then(m => m.CourtsModule),
    canActivate: [AuthGuard]
  },
  
  // Bookings Module (preparado para futuras implementaciones)
  {
    path: 'bookings',
    loadChildren: () => import('./features/bookings/bookings.module').then(m => m.BookingsModule),
    canActivate: [AuthGuard]
  },
  
  // Redirección por defecto
  { path: '**', redirectTo: '' }
];
