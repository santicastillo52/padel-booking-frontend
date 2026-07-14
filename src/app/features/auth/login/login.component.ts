import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../../../core/services/alerts/alerts.service';
import { User } from '../../../core/models/user.model';
import { Subject, takeUntil } from 'rxjs';

import { UiButtonComponent, UiPanelComponent } from '../../../shared/ui';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, UiPanelComponent, UiButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertService = inject(AlertsService);
  //takeUntil() se usa para cancelar la suscripción cuando el componente se destruye, es lo mismo que new Subscription() pero es mas limpio.
  private destroy$ = new Subject<void>();

  userForm!: FormGroup;
  isSubmitting: boolean = false;
  messageButton: string = 'Iniciar sesión';

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.userForm.valid && !this.isSubmitting) {
      const user: User = {
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      };

      this.isSubmitting = true;
      this.messageButton = 'Iniciando sesión...';

      this.authService.login(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response.token);
            const user = this.authService.getUser();
            this.resetForm();

            if (user.role === 'client') {
              this.router.navigate(['/']);
            } else if(user.role === 'admin'){
              this.router.navigate(['/courts/reservations']);
            }
            else {
              this.router.navigate(['/login']);
              this.alertService.error('Rol de usuario no válido');
            }
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
    this.messageButton = 'Iniciar sesión';
  }
}
