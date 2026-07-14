import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
//hay que crear dos guard diferentes, uno para admin y otro para client
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser();
    if (user && (user.role === 'admin' || user.role === 'client')) {
      return true;  
    } else {
      this.router.navigate(['/']);  
      return false;
    }
  }
}

