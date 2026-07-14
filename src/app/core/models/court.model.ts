import { Schedules } from './schedules.model';
import { Image } from "./images.model";
import { Club, ClubBooking } from "./club.model";

export interface Court {

  id: number;
  name: string;
  court_type: string;
  wall_type: string;
  clubId: number;
  Club: Club;
  available: boolean;
  CourtSchedules: Schedules[];
  Images: Image[];
}

export interface CourtBooking {
  id: number;
  name: string;
  Club: ClubBooking;
}