import { Component, inject } from '@angular/core';
import { CourtService } from '../../../core/services/court/court.service';
import { Subject, takeUntil } from 'rxjs';
import { AlertsService } from '../../../core/services';
import { Court } from '../../../core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { API_BASE_URL } from '../../../shared/utils';
import { CourtsSchedulesListComponent } from "../courts-schedules-list/courts-schedules-list.component";
import { CourtEditComponent } from "../court-edit/court-edit.component";
import { CourtsSchedulesFormComponent } from "../courts-schedules-form/courts-schedules-form.component";
import { CourtImageEditComponent } from "../court-image-edit/court-image-edit.component";
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../shared/components";

import { UiButtonComponent } from '../../../shared/ui';

@Component({
  selector: 'app-courts-detail',
  standalone: true,
  imports: [CourtsSchedulesListComponent, CourtEditComponent, CourtsSchedulesFormComponent, CourtImageEditComponent, CommonModule, LoadingComponent, UiButtonComponent],
  templateUrl: './courts-detail.component.html',
  styleUrl: './courts-detail.component.scss'
})
export class CourtsDetailComponent {

  private route = inject(ActivatedRoute);
  private courtService = inject(CourtService);
  private alertService = inject(AlertsService);
  private destroy$ = new Subject<void>();
  readonly apiUrl = API_BASE_URL;

  court!: Court;
  isEditing = false;

  ngOnInit() {
    const courtId = this.route.snapshot.paramMap.get('id');
    if (courtId) {
      this.getCourt(+courtId);
    }
    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCourt(id: number) {
    this.courtService.getCourtById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.court = response;
        },
        error: (error) => {
          const errorMessage =
            error.error?.message || 'Error al obtener la cancha';
          this.alertService.error(errorMessage);
        },
      });
  }

}



