import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../shared/utils';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Booking, CreateBookingRequest, DeleteBookingRequest, UpdateBookingStatusRequest } from '../../models/bookings.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

private apiUrl = API_BASE_URL;
private readonly http = inject(HttpClient);



getBookings(status: string): Observable<Booking[]>{
  return this.http.get<Booking[]>(`${this.apiUrl}/bookings?status=${status}`)
    .pipe(shareReplay(1));
}

createBooking(booking: CreateBookingRequest): Observable<CreateBookingRequest>{
  return this.http.post<CreateBookingRequest>(`${this.apiUrl}/bookings`, booking);
}

updateBookingStatus(data: UpdateBookingStatusRequest): Observable<UpdateBookingStatusRequest>{
  return this.http.patch<UpdateBookingStatusRequest>(`${this.apiUrl}/bookings/${data.id}`,  {status: data.status} );
}

deleteBooking(data: DeleteBookingRequest): Observable<DeleteBookingRequest>{
  return this.http.delete<DeleteBookingRequest>(`${this.apiUrl}/bookings/${data.id}`);
}

}
