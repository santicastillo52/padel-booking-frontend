import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';
import { AuthGuard } from '../../core/guards';
import { BookingsListComponent } from './bookings-list/bookings-list.component';

// TODO: Importar componentes cuando se implementen
// import { BookingListComponent } from './booking-list/booking-list.component';
// import { BookingFormComponent } from './booking-form/booking-form.component';

const routes: Routes = [
  { path: '', component: BookingsComponent },
  // TODO: Agregar rutas cuando se implementen los componentes
  // { path: 'list', component: BookingListComponent },
  // { path: 'form', component: BookingFormComponent },
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },
  { path: 'list', component: BookingsListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BookingsComponent,
    BookingsListComponent,
    RouterModule.forChild(routes)
  ]
})
export class BookingsModule { }