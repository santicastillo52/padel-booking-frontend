import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CourtListComponent } from './court-list/court-list.component';
import { CourtFormComponent } from './court-form/court-form.component';
import { CourtEditComponent } from './court-edit/court-edit.component';
import { CourtManagementComponent } from './court-management/court-management.component';
import { CourtsSchedulesFormComponent } from './courts-schedules-form/courts-schedules-form.component';
import { CourtReservationsListComponent } from './court-reservations-list/court-reservations-list.component';
import { CourtsSchedulesListComponent } from './courts-schedules-list/courts-schedules-list.component';
import { CourtsDetailComponent } from './courts-detail/courts-detail.component';

const routes: Routes = [
  { path: 'list', component: CourtListComponent },
  { path: 'form', component: CourtFormComponent },
  { path: 'edit/:id', component: CourtEditComponent },
  { path: 'management', component: CourtManagementComponent },
  { path: 'reservations', component: CourtReservationsListComponent },
  { path: 'detail/:id', component: CourtsDetailComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CourtListComponent,
    CourtFormComponent,
    CourtEditComponent,
    CourtManagementComponent,
    CourtsSchedulesFormComponent,
    CourtReservationsListComponent,
    CourtsSchedulesListComponent,
  
    RouterModule.forChild(routes)
  ]
})
export class CourtsModule { } 