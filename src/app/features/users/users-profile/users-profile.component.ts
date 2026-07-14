import { Component, inject, OnDestroy } from '@angular/core';
import { AlertsService, AuthService, UsersService } from '../../../core/services';
import { User } from '../../../core/models';
import { Subject, takeUntil } from 'rxjs';
import { LoadingComponent } from '../../../shared/components';
import { PositionPipe, GenderPipe } from '../../../shared/pipes';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  UiBadgeComponent,
  UiButtonComponent,
  UiPageHeaderComponent,
} from '../../../shared/ui';

@Component({
  selector: 'app-users-profile',
  standalone: true,
  imports: [
    LoadingComponent,
    PositionPipe,
    GenderPipe,
    ReactiveFormsModule,
    UiPageHeaderComponent,
    UiButtonComponent,
    UiBadgeComponent,
  ],
  templateUrl: './users-profile.component.html',
  styleUrl: './users-profile.component.scss',
})
export class UsersProfileComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly usersService = inject(UsersService);
  private readonly alertService = inject(AlertsService);
  private destroy$ = new Subject<void>();

  userId?: number;
  user?: User;
  isEditing = false;
  isSubmitting = false;
  messageButton = 'Guardar cambios';
  userFormEdit!: FormGroup;

  get userInitials(): string {
    const name = this.user?.name?.[0] ?? '';
    const lastName = this.user?.last_name?.[0] ?? '';
    return `${name}${lastName}`.toUpperCase();
  }

  ngOnInit() {
    this.userId = this.authService.getUser().id;
    this.getUserById();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm() {
    this.userFormEdit = new FormGroup({
      name: new FormControl(this.user?.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      last_name: new FormControl(this.user?.last_name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      position: new FormControl(this.user?.position, [Validators.required]),
      level: new FormControl(this.user?.level, [Validators.required]),
    });
  }

  getUserById() {
    if (!this.userId) {
      return;
    }

    this.usersService
      .getUserById(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.user = response;
          this.isEditing = false;
          this.initForm();
        },
        error: () => {
          this.alertService.error('Error al buscar el usuario');
        },
      });
  }

  toggleEdit() {
    if (this.isSubmitting) {
      return;
    }

    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.userFormEdit.patchValue({
        name: this.user?.name,
        last_name: this.user?.last_name,
        position: this.user?.position,
        level: this.user?.level,
      });
    }
  }

  saveUser() {
    if (!this.user?.id || this.userFormEdit.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.messageButton = 'Guardando cambios...';

    this.usersService
      .editUser(this.userFormEdit.value, this.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.user = response;
          this.isEditing = false;
          this.resetSubmitState();
          this.alertService.success('Datos actualizados correctamente!');
        },
        error: () => {
          this.resetSubmitState();
          this.alertService.error('No se pudieron guardar los cambios');
        },
      });
  }

  private resetSubmitState() {
    this.isSubmitting = false;
    this.messageButton = 'Guardar cambios';
  }
}
