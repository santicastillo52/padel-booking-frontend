export interface Schedules {
    id: number;
    day_of_week: string;
    start_time: number;
    end_time: number;
    date?: any;
}

export interface ScheduleBooking {
    id: number;
    day_of_week: string;
    start_time: number;
    end_time: number;
}