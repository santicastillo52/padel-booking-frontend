export interface User {
    name?: string;
    last_name?: string;
    email: string;
    password: string;
    role?: string;
    position?: string;
    level?: number;
    id?: number;
    clubId?: number;
    gender?: string;
  }

  export interface UserBooking{
    id: number;
    name: string;
    last_name: string;
    email: string;
  }