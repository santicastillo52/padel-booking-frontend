import { Component, EventEmitter, Input, Output } from '@angular/core';
import { API_BASE_URL } from '../../../shared/utils';
import { Court, Schedules } from '../../../core/models';
import { DayNamePipe } from "../../../shared/pipes/day-name.pipe";
import { WallTypePipe } from '../../../shared/pipes/wall-type.pipe';
import { CourtTypePipe } from '../../../shared/pipes';

import { UiButtonComponent, UiCardComponent } from '../../../shared/ui';

export interface ReserveCourtEvent {
  court: Court;
  schedule: Schedules;
}

@Component({
  selector: 'app-bookings-list',
  standalone: true,
  imports: [DayNamePipe, CourtTypePipe, WallTypePipe, UiCardComponent, UiButtonComponent],
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.scss'
})
export class BookingsListComponent {
  apiUrl = API_BASE_URL;
  @Input() courts: Court[] = [];
  @Input() reservingScheduleId: number | null = null;
  @Output() sendReserveCourt = new EventEmitter<ReserveCourtEvent>();

  reserveCourt(court: Court, schedule: Schedules): void {
    if (this.reservingScheduleId !== null) {
      return;
    }
    this.sendReserveCourt.emit({ court, schedule });
  }
}
