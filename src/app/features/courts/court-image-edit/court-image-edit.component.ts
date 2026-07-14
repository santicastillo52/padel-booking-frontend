import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Court } from '../../../core/models/court.model';
import { AlertsService, CourtService } from '../../../core/services';
import { Subject, takeUntil } from 'rxjs';

import { UiButtonComponent, UiPanelComponent } from '../../../shared/ui';

@Component({
  selector: 'app-court-image-edit',
  standalone: true,
  imports: [UiPanelComponent, UiButtonComponent],
  templateUrl: './court-image-edit.component.html',
  styleUrl: './court-image-edit.component.scss'
})
export class CourtImageEditComponent {

  @Input() court!: Court;
  @Output() imageUpdated = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();
  selectedFile: File | null = null;
  isSubmitting = false;
  messageButton = 'Guardar imagen';
  private courtService = inject(CourtService);
  private alertService = inject(AlertsService);
  private destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  saveImage() {
    if (!this.selectedFile || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.messageButton = 'Guardando imagen...';

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.courtService.editCourtImage(formData, this.court.Images[0].id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.alertService.success('Imagen actualizada correctamente');
          this.imageUpdated.emit();
          this.resetSubmitState();
        },
        error: (error) => {
          const errorMessage =
            error.error?.message || 'Error al actualizar la imagen';
          this.alertService.error(errorMessage);
          this.resetSubmitState();
        },
      });
  }

  onCancelEdit() {
    if (this.isSubmitting) {
      return;
    }
    this.cancelEdit.emit();
  }

  private resetSubmitState() {
    this.isSubmitting = false;
    this.messageButton = 'Guardar imagen';
  }
}
