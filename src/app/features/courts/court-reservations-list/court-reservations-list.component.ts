import { Component, inject } from '@angular/core';
import { BookingsService } from '../../../core/services/bookings/bookings.service';
import { Subject, takeUntil } from 'rxjs';
import { AlertsService, AuthService, ClubsService } from '../../../core/services';
import { CommonModule } from '@angular/common';
import { DayNamePipe } from '../../../shared/pipes/day-name.pipe';
import { StatusPipe } from "../../../shared/pipes/status.pipe";
import { Booking, DeleteBookingRequest, UpdateBookingStatusRequest } from '../../../core/models/bookings.model';

import { UiButtonComponent, UiEmptyStateComponent, UiPageHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-court-reservations-list',
  standalone: true,
  imports: [CommonModule, DayNamePipe, StatusPipe, UiButtonComponent, UiPageHeaderComponent, UiEmptyStateComponent],
  templateUrl: './court-reservations-list.component.html',
  styleUrl: './court-reservations-list.component.scss'
})
export class CourtReservationsListComponent {
  private readonly bookingsService = inject(BookingsService);
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertsService);


  reservations: Booking[] = [];
  role: string = '';
  status: string = 'pending';
  private readonly destroy$ = new Subject<void>();

  get statusLabel(): string {
    const labels: Record<string, string> = {
      confirmed: 'confirmadas',
      pending: 'pendientes',
      completed: 'completadas',
      cancelled: 'canceladas',
    };
    return labels[this.status] ?? '';
  }

  ngOnInit(): void{
    this.role = this.authService.getUser().role;
    this.getReservations()
  }

  ngOnDestroy():void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getReservations(): void{
    this.bookingsService.getBookings(this.status).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.reservations = response;
      }
    });
  }

  setStatus(status: string):void {
    this.status = status;
    this.getReservations()
  }

  changeStatusReservation(reservationId: number, status: string): void {
    const data = {
      id: reservationId,
      status: status as 'confirmed' | 'cancelled'
    };

    if(status === 'cancelled'){
      this.cancelReservation(data);
    } else if(status === 'confirmed'){
      this.updateReservation(data)
    } else {
      this.alertService.error('error inesperado');
    }
  }
  
  private updateReservation(data: UpdateBookingStatusRequest): void{
    this.bookingsService.updateBookingStatus(data).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.alertService.success('Reserva confirmada correctamente');
        this.getReservations();
      }
    });
  }

  private async cancelReservation(data: UpdateBookingStatusRequest): Promise<void>{

    const confirmed = await this.alertService.delete();
    if(confirmed){
      this.bookingsService.updateBookingStatus(data).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (response) => {
          this.alertService.success('Reserva cancelada correctamente');
          this.getReservations();
        }
      });
    }
  }
  
  async deleteReservation(reservation: DeleteBookingRequest): Promise<void> {
    const confirmed = await this.alertService.delete();

    if (confirmed) {

      const data = {
        id: reservation.id,
        courtScheduleId: reservation.courtScheduleId
      }

      this.bookingsService.deleteBooking(data).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (response) => {
          this.alertService.success('Reserva eliminada correctamente');
          this.getReservations();
        }
      });
    }
  }
}


