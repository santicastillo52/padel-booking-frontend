import { Court, CourtBooking } from "./court.model";
import { ScheduleBooking, Schedules } from "./schedules.model";
import { User, UserBooking } from "./user.model";

export interface Booking {
    id: number;
    date: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    courtId: number;
    clubId: number;
    courtScheduleId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    
 
    Court: CourtBooking;
    CourtSchedule: ScheduleBooking;
    User: UserBooking;
  }
  
  
  export interface UpdateBookingStatusRequest {
    id: number;
    status: 'pending' | 'confirmed' | 'cancelled';
  }
  
  export interface DeleteBookingRequest {
    id: number;
    courtScheduleId: number;
  }
  
  export interface CreateBookingRequest {
    date: string;
    courtId: number;
    courtScheduleId: number;
    clubId: number;
  }