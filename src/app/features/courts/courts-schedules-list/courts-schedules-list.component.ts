import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { DayNamePipe } from "../../../shared/pipes/day-name.pipe";
import { Schedules } from '../../../core/models';
import { Subject, takeUntil } from 'rxjs';
import { CourtService } from '../../../core/services/court/court.service';
import { AlertsService } from '../../../core/services';


import { UiButtonComponent } from '../../../shared/ui';

@Component({
  selector: 'app-courts-schedules-list',
  standalone: true,
  imports: [DayNamePipe, UiButtonComponent],
  templateUrl: './courts-schedules-list.component.html',
  styleUrl: './courts-schedules-list.component.scss'
})
export class CourtsSchedulesListComponent {

  day: string = 'monday';
  @Input() courtSchedules: Schedules[] = [];
  @Input() courtId!: number;
  @Output() scheduleDeleted = new EventEmitter<void>();
  
  private courtService = inject(CourtService);
  private alertService = inject(AlertsService);
  private destroy$ = new Subject<void>();

  days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectDay(day: string) {
    this.day = day;
}

//Al esperar una respuesta desde sweet alert, debemos hacer que la funcion sea async
async deleteScheduleFromDB(schedule: number) {
  const confirmed = await this.alertService.delete();

  if (confirmed) {
    this.courtService.deleteSchedule(schedule)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.alertService.success('Horario eliminado correctamente');
          this.scheduleDeleted.emit();
        }
      });
  }
}
 
}
