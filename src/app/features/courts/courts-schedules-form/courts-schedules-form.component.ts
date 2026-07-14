import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { Schedules } from '../../../core/models/schedules.model';
import { Subject, takeUntil } from 'rxjs';
import { CourtService } from '../../../core/services';

import { UiButtonComponent } from '../../../shared/ui';

@Component({
  selector: 'app-courts-schedules-form',
  standalone: true,
  imports: [ReactiveFormsModule, UiButtonComponent],
  templateUrl: './courts-schedules-form.component.html',
  styleUrl: './courts-schedules-form.component.scss',
})
export class CourtsSchedulesFormComponent {
  scheduleForm!: FormGroup;
  scheduleList: Schedules[] = [];
  isSubmitting = false;
  messageButton = 'Enviar horarios';
  @Input() courtId!: number;
  @Output() schedulesListCreated = new EventEmitter<void>();

  private alertService = inject(AlertsService);
  private courtService = inject(CourtService);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.initScheduleForm();
  }

  initScheduleForm() {
    this.scheduleForm = new FormGroup({
      day_of_week: new FormControl('', Validators.required),
      start_time: new FormControl('', Validators.required),
      end_time: new FormControl('', Validators.required),
    });
  }

  sendSchedules() {
    if (this.scheduleList.length === 0 || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.messageButton = 'Enviando horarios...';

    this.courtService.createSchedules(this.scheduleList, this.courtId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.alertService.success('Horarios creados correctamente');
          this.scheduleList = [];
          this.schedulesListCreated.emit();
          this.resetSubmitState();
        },
        error: (error) => {
          const errorMessage =
            error.error?.message || 'Error al crear horarios';
          this.alertService.error(errorMessage);
          this.resetSubmitState();
        },
      });
  }

  addSchedule() {
    if (this.scheduleForm.invalid) {
      this.alertService.error(
        'Por favor, completa todos los campos requeridos.'
      );
      return;
    }

    this.scheduleList.push(this.scheduleForm.value);
    this.scheduleForm.reset();
  }

  cancelSchedules() {
    if (this.isSubmitting) {
      return;
    }
    this.scheduleForm.reset();
    this.scheduleList = [];
    this.alertService.success('Se ha cancelado la edición de horarios');
  }

  deleteSchedule(schedule: Schedules) {
    if (this.isSubmitting) {
      return;
    }
    this.scheduleList = this.scheduleList.filter((s) => s !== schedule);
  }

  private resetSubmitState() {
    this.isSubmitting = false;
    this.messageButton = 'Enviar horarios';
  }
}
