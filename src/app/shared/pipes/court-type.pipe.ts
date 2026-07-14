import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courtType',
  standalone: true
})
export class CourtTypePipe implements PipeTransform {
  transform(courtType: string): string {
    const courtTypeMap: { [key: string]: string } = {
        'indoor': 'Interior',
        'outdoor': 'Exterior',
    };
    return courtTypeMap[courtType] || courtType;
  }
}