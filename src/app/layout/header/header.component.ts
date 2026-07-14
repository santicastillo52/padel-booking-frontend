import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth-service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../core/models';

import { UiButtonComponent } from '../../shared/ui';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, UiButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    isLoggedIn: boolean = false;
    authCheked: boolean = false;
    user?: User;
   

    ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe(status => {
        this.isLoggedIn = status;
        this.user = this.authService.getUser(); 
        this.authCheked = true;
      });
       
    }
    logout(): void {
      this.authService.logout();
      this.user = undefined;
      this.router.navigate(['/']);
    }
     
}
