import { Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourtService } from '../../../core/services/court/court.service';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { Court } from '../../../core/models/court.model';
import { Schedules } from '../../../core/models/schedules.model';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';


import { UiButtonComponent, UiPanelComponent } from '../../../shared/ui';

@Component({
  selector: 'app-court-edit',
  standalone: true,
  imports: [ReactiveFormsModule, UiPanelComponent, UiButtonComponent] ,
  templateUrl: './court-edit.component.html',
  styleUrl: './court-edit.component.scss',
})
export class CourtEditComponent implements OnDestroy {

  private router = inject(Router);
  private courtService = inject(CourtService);
  private alertService = inject(AlertsService);
  private destroy$ = new Subject<void>();


  @Input() court?: Court;
  @Output() courtUpdated = new EventEmitter<void>();
  scheduleList: Schedules[] = [];
  courtFormEdit!: FormGroup;
  isSubmitting = false;
  messageButton = 'Guardar cambios';
  messageDeleteButton = 'Eliminar cancha';

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm() {
    this.courtFormEdit = new FormGroup({
      name: new FormControl(this.court?.name, [Validators.required]),
      court_type: new FormControl(this.court?.court_type, [Validators.required]),
      wall_type: new FormControl(this.court?.wall_type, [Validators.required]),
      available: new FormControl(this.court?.available, [Validators.required]),
    });
  }

  saveCourt() {
    if (!this.court?.id || this.isSubmitting || this.courtFormEdit.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.messageButton = 'Guardando cambios...';

    this.courtService
      .editCourt(this.courtFormEdit.value, this.court.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.court = response;
          this.alertService.success('Cancha editada exitosamente!');
          this.courtUpdated.emit();
          this.resetSubmitState();
        },
        error: (error) => {
          const errorMessage =
            error.error?.message || 'Error al actualizar cancha';
          this.alertService.error(errorMessage);
          this.resetSubmitState();
        },
      });
  }

  async deleteCourt() {
    if (this.isSubmitting || !this.court?.id) {
      return;
    }

    const confirmed = await this.alertService.delete();

    if (!confirmed) {
      return;
    }

    this.isSubmitting = true;
    this.messageDeleteButton = 'Eliminando cancha...';

    this.courtService.deleteCourt(this.court.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.alertService.success(`${response.name} eliminada exitosamente.`);
          this.router.navigate(['/courts/management']);
        },
        error: (error) => {
          const errorMessage =
            error.error?.message || 'Error al eliminar cancha';
          this.alertService.error(errorMessage);
          this.resetSubmitState();
        },
      });
  }

  private resetSubmitState() {
    this.isSubmitting = false;
    this.messageButton = 'Guardar cambios';
    this.messageDeleteButton = 'Eliminar cancha';
  }
}