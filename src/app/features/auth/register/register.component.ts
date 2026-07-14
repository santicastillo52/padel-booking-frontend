import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { UiButtonComponent, UiPanelComponent } from '../../../shared/ui';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, UiPanelComponent, UiButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  private authService = inject(AuthService);
  private alertService = inject(AlertsService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  userForm!: FormGroup;
  isSubmitting: boolean = false;
  messageButton: string = 'Registrarse';

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
      role: new FormControl('client'),
      position: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    });
  }

  register() {
    if (this.userForm.valid && !this.isSubmitting) {
      const user: User = {
        name: this.userForm.value.name,
        last_name: this.userForm.value.last_name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        position: this.userForm.value.position,
        level: Number(this.userForm.value.level),
        gender: this.userForm.value.gender
      };

      this.isSubmitting = true;
      this.messageButton = 'Registrando usuario...';

      this.authService.register(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.alertService.success('Usuario registrado correctamente');
            this.resetForm();
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            this.resetForm();
          }
        });
    } else {
      this.alertService.error('Por favor, completa todos los campos requeridos');
    }
  }

  private resetForm() {
    this.isSubmitting = false;
    this.messageButton = 'Registrarse';
  }

  passwordDoNotMatch(){
    return this.userForm.get('password')?.value !== this.userForm.get('repeatPassword')?.value;
  }
}
