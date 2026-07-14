import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourtService } from '../../../core/services/court/court.service';
import { ClubsService } from '../../../core/services/clubs/clubs.service';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { Court } from '../../../core/models/court.model';
import { Subject, takeUntil } from 'rxjs';

import { UiButtonComponent, UiPanelComponent } from '../../../shared/ui';

@Component({
  selector: 'app-court-form',
  standalone: true,
  imports: [ReactiveFormsModule, UiPanelComponent, UiButtonComponent],
  templateUrl: './court-form.component.html',
  styleUrl: './court-form.component.scss',
})
export class CourtFormComponent implements OnDestroy {
  private courtsService = inject(CourtService);
  private clubsService = inject(ClubsService);
  private alertsService = inject(AlertsService);
  private destroy$ = new Subject<void>();

  courtList: { court: Court, image: File | null }[] = [];
  selectedFile: File | null = null;
  courtForm!: FormGroup;
  messageButton: string = 'Enviar Canchas';
  isSubmitting: boolean = false;

  ngOnInit() {
    this.getClubId();
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm() {
    this.courtForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      court_type: new FormControl('', [Validators.required]),
      wall_type: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      clubId: new FormControl(),
    });
  }

  //hace que clubId sea llene automáticamente con el id del club al que pertenece el usuario
  getClubId() {
    this.clubsService.getMyClub()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (club) => {
          this.courtForm.patchValue({ clubId: club.id });
        },
        error: (error) => {
          console.error('Error al obtener el club del usuario', error.details);
        },
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validar formato de imagen
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        this.alertsService.error('Formato de imagen no válido. Solo se permiten: JPG, PNG, WEBP');
        event.target.value = '';
        return;
      }
      
      if (file.size > maxSize) {
        this.alertsService.error('El archivo es demasiado grande. Máximo 5MB permitido');
        event.target.value = '';
        return;
      }
      
      this.selectedFile = file;
      this.courtForm.patchValue({ image: file });
    } else {
      this.selectedFile = null;
      this.courtForm.patchValue({ image: null }); 
    }
    this.courtForm.get('image')?.updateValueAndValidity();
  
  }

  addCourt() {
    if (this.courtForm.invalid) {
      this.alertsService.error('Por favor, completa todos los campos requeridos.');
      return;
    }
  

     // Verificar duplicados con some()
    const newName = this.courtForm.value.name;
  
    const isDuplicate = this.courtList.some(item => 
      //replace sirve para eliminar los espacios en blanco, ejemplo cancha 5 y cancha5 se agregarian si no fuese por replace
      item.court.name.toLowerCase().trim().replace(/\s+/g, "") === newName.toLowerCase().trim().replace(/\s+/g, "")
    );
    
    if (isDuplicate) {
      this.alertsService.error(`Ya existe una cancha con el nombre ${newName}`);
      return;
    }
    
    this.courtList.push({
      court: this.courtForm.value, 
      image: this.courtForm.get('image')?.value 
    });
    
    this.courtForm.reset();
    this.selectedFile = null;
    this.getClubId();
  }

  sendCourts() {
    if (this.courtList.length === 0) {
      this.alertsService.error('No hay canchas para enviar');
      return;
    } else {

      this.isSubmitting = true;
      this.messageButton = 'Enviando canchas...'

      const courts = this.courtList.map(item => item.court);
      const images = this.courtList.map(item => item.image).filter((image): image is File => image !== null);
      
      const formData = new FormData();
      
      // Agregar cada cancha con su índice
      courts.forEach((court, index) => {
        formData.append(`courts[${index}][name]`, court.name);
        formData.append(`courts[${index}][clubId]`, court.clubId.toString());
        formData.append(`courts[${index}][court_type]`, court.court_type);
        formData.append(`courts[${index}][wall_type]`, court.wall_type);
      });
      
      // Agregar todas las imágenes con el mismo nombre
      images.forEach(image => {
        formData.append('image', image);
      });
      
      this.courtsService.createCourts(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.alertsService.success('Canchas creadas correctamente');
            this.courtForm.reset();
            this.courtList = [];
            this.courtsService.notifyCourtsChanged();
            this.isSubmitting = false;
            this.messageButton = 'Enviar canchas';
          },
          error: (error) => {
            const errorMessage = error?.error?.message || 'Error desconocido';
            this.alertsService.error(errorMessage);
            this.isSubmitting = false;
            this.messageButton = 'Enviar canchas';
          },
        });
    }
  }



  cancelCourts() {
    this.courtForm.reset();
    this.courtList = [];
  }

  deleteCourt(name: string) {
    this.courtList = this.courtList.filter((item) => item.court.name !== name);
  }
}

