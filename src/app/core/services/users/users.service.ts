import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { Observable, shareReplay } from 'rxjs';
import { User } from '../../models/user.model';
import { API_BASE_URL } from '../../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = API_BASE_URL; 

  private readonly http = inject(HttpClient);

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(shareReplay(1));
  }

  editUser(user: User, userId: number): Observable<User> {
    console.log(user);
    return this.http.patch<User>(`${this.apiUrl}/users/${userId}`, user);
  }
}
