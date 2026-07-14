import { Court } from "./court.model";
import { Image } from "./images.model";

export interface Club {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    userId: number;
    Club?: Club[];
    Courts: Court[];
    Images: Image[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ClubBooking {
    id: number;
    name: string;
}