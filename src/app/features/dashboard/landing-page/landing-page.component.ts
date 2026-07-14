import { Component } from '@angular/core';
import { SliderComponent } from '../../../shared/components/slider/slider.component';
import { inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services';


import { UiBadgeComponent, UiButtonComponent } from '../../../shared/ui';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SliderComponent, RouterModule, UiButtonComponent, UiBadgeComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  redirigir(): void{
    this.authService.isLoggedIn$.subscribe(status => {
      status ? this.router.navigate(['/bookings']) : this.router.navigate(['/auth/login']);
    })
  }
}