import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayName',
  standalone: true
})
export class DayNamePipe implements PipeTransform {
  transform(day: string): string {
    const dayMap: { [key: string]: string } = {
      'monday': 'Lunes',
      'tuesday': 'Martes', 
      'wednesday': 'Miércoles',
      'thursday': 'Jueves',
      'friday': 'Viernes',
      'saturday': 'Sábado',
      'sunday': 'Domingo'
    };
    
    return dayMap[day] || day;
  }
} 
