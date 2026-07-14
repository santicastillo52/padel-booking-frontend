import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { Court } from '../../models/court.model';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Schedules } from '../../models/schedules.model';
import { API_BASE_URL } from '../../../shared/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class CourtService {
  private apiUrl = API_BASE_URL; 

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  //Sirve para avisar el cambio de un componente a otro, en este caso de court-form a court-list
  private courtsChanged = new Subject<void>();
  courtsChanged$ = this.courtsChanged.asObservable();
  
  

  notifyCourtsChanged(){
    this.courtsChanged.next();
  }

  getAvailableCourts(filters?: {
    day_of_week?: string;
    start_time?: string;
    end_time?: string;
    clubId?: number;
    wall_type?: string;
    court_type?: string;
  }): Observable<Court[]> {
    let params = new HttpParams();
    
    if (filters?.day_of_week) {
      params = params.append('day_of_week', filters.day_of_week);
    }
    if (filters?.start_time) {
      params = params.append('start_time', filters.start_time);
    }
    if (filters?.end_time) {
      params = params.append('end_time', filters.end_time);
    }
    if (filters?.clubId) {
      params = params.append('clubId', filters.clubId.toString());
    }
    if (filters?.wall_type) {
      params = params.append('wall_type', filters.wall_type);
    }
    if (filters?.court_type) {
      params = params.append('court_type', filters.court_type);
    }
    
    return this.http.get<Court[]>(`${this.apiUrl}/courts/available`, { params }).pipe(shareReplay(1));
  }

  getCourtById(id: number): Observable<Court> {
    return this.http.get<Court>(
      `${this.apiUrl}/courts/${id}`
    ).pipe(shareReplay(1));
  }

  
  createCourts(formData: FormData): Observable<Court[]> {
    return this.http.post<Court[]>(
      `${this.apiUrl}/courts`,
      formData 
    );
  }

  editCourt(court: Court, courtId: number): Observable<Court> {
    return this.http.patch<Court>(`${this.apiUrl}/courts/${courtId}`, court);
  }

  editCourtImage(image: FormData, imageId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/images/${imageId}`, image);
  }

  deleteCourt(courtId: number): Observable<Court> {
    return this.http.delete<Court>(`${this.apiUrl}/courts/${courtId}`);;
  }

  createSchedules(
    newSchedules: Schedules[],
    courtId: number
  ): Observable<Schedules[]> {
    return this.http.post<Schedules[]>(
      `${this.apiUrl}/schedules/${courtId}`,
      newSchedules 
    );;
  }

  deleteSchedule(scheduleId: number): Observable<Schedules> {
    return this.http.delete<Schedules>(
      `${this.apiUrl}/schedules/${scheduleId}` 
    );;
  }
}
