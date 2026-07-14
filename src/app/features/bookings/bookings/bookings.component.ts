import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Club, Court } from '../../../core/models';
import { AlertsService, AuthService, ClubsService, CourtService } from '../../../core/services';
import { Subject, takeUntil } from 'rxjs';
import { BookingsListComponent, ReserveCourtEvent } from "../bookings-list/bookings-list.component";
import { BookingsService } from '../../../core/services/bookings/bookings.service';
import { CreateBookingRequest } from '../../../core/models/bookings.model';
import { Router } from '@angular/router';

import { UiBadgeComponent, UiButtonComponent, UiEmptyStateComponent, UiPageHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    BookingsListComponent,
    FormsModule,
    UiButtonComponent,
    UiPageHeaderComponent,
    UiEmptyStateComponent,
    UiBadgeComponent,
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit, OnDestroy {
  courts: Court[] = [];
  clubs: Club[] = [];
  hasSearched = false;
  reservingScheduleId: number | null = null;
  filters = {
    clubId: '',
    day_of_week: '',
    start_time: '',
    end_time: '',
    wall_type: '',
    court_type: ''
  };

  private readonly courtService = inject(CourtService);
  private readonly alertService = inject(AlertsService);
  private readonly clubsService = inject(ClubsService);
  private readonly bookingsService = inject(BookingsService);
  private readonly router = inject(Router);

  private destroy$ = new Subject<void>();
  isSubmitting = false;
  messageButton = 'Buscar canchas';

  get activeFiltersCount(): number {
    return Object.values(this.filters).filter((value) => !!value).length;
  }

  get courtsCountLabel(): string {
    const count = this.courts.reduce(
      (total, court) => total + (court.CourtSchedules?.length ?? 0),
      0
    );
    return count === 1
      ? '1 turno disponible'
      : `${count} turnos disponibles`;
  }

  ngOnInit(): void {
    this.getDropdownClubs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDropdownClubs(): void {
    this.clubsService.getClubs().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (clubs: Club[]) => {
        this.clubs = clubs;
      },
      error: () => {
        this.alertService.error('Error al cargar la lista de clubes');
      }
    });
  }

  clearFilters(): void {
    this.filters = {
      clubId: '',
      day_of_week: '',
      start_time: '',
      end_time: '',
      wall_type: '',
      court_type: '',
    };
  }

  searchCourts(): void {
    if (this.isSubmitting) {
      return;
    }

    const searchFilters: Record<string, string> = {};

    if (this.filters.clubId) {
      searchFilters['clubId'] = this.filters.clubId;
    }
    if (this.filters.day_of_week) {
      searchFilters['day_of_week'] = this.filters.day_of_week;
    }
    if (this.filters.start_time) {
      searchFilters['start_time'] = this.filters.start_time;
    }
    if (this.filters.end_time) {
      searchFilters['end_time'] = this.filters.end_time;
    }
    if (this.filters.wall_type) {
      searchFilters['wall_type'] = this.filters.wall_type;
    }
    if (this.filters.court_type) {
      searchFilters['court_type'] = this.filters.court_type;
    }

    this.isSubmitting = true;
    this.messageButton = 'Buscando canchas...';

    this.courtService.getAvailableCourts(searchFilters).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: Court[]) => {
        this.courts = response;
        this.hasSearched = true;
        this.resetSearchButton();
      },
      error: () => {
        this.courts = [];
        this.hasSearched = true;
        this.resetSearchButton();
      }
    });
  }

  reserveCourt(event: ReserveCourtEvent): void {
    if (this.reservingScheduleId !== null) {
      return;
    }

    this.reservingScheduleId = event.schedule.id;

    const booking: CreateBookingRequest = {
      date: event.schedule.date,
      courtId: event.court.id,
      courtScheduleId: event.schedule.id,
      clubId: event.court.clubId,
    };

    this.bookingsService.createBooking(booking).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.alertService.success('Cancha reservada correctamente');
        this.router.navigate(['/courts/reservations']);
      },
      error: () => {
        this.reservingScheduleId = null;
        this.alertService.error('No se pudo completar la reserva. Intentá de nuevo.');
      }
    });
  }

  private resetSearchButton(): void {
    this.isSubmitting = false;
    this.messageButton = 'Buscar canchas';
  }
}
