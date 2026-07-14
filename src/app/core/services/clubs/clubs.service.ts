import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { Observable } from 'rxjs';
// shareReplay() se usa para cachear la respuesta de la petición, es decir, se guarda en memoria y se devuelve el mismo resultado cuando se hace la misma petición.
import { shareReplay } from 'rxjs/operators';
import { Club } from '../../models/club.model';
import { API_BASE_URL } from '../../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {  
  private apiUrl = API_BASE_URL; 

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  
  private getAuthHeaders(): { [header: string]: string } {
    const token = this.authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.apiUrl}/clubs`)
      .pipe(shareReplay(1));
  }

  getDropdownClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.apiUrl}/clubs/dropdown`)
      .pipe(shareReplay(1));
  }

  getClubById(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/clubs/${id}`)
      .pipe(shareReplay(1));
  }

  getMyClub(): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/clubs/me`)
      .pipe(shareReplay(1));
  }
}
