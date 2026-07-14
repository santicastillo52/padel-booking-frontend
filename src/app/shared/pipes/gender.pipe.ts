import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'gender',
  standalone: true
})
export class GenderPipe implements PipeTransform {
  transform(gender: string | undefined): string {
    if (!gender) {
        return 'No especificado';
    }
    const genderMap: { [key: string]: string } = {
        'male': 'Masculino',
        'female': 'Femenino',
        'unspecified': 'No especificado'
    };
    return genderMap[gender] || gender;
  }
}