import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'wallType',
  standalone: true
})
export class WallTypePipe implements PipeTransform {
  transform(wallType: string): string {
    const wallTypeMap: { [key: string]: string } = {
        'acrylic': 'Acrilico',
        'cement': 'Cemento'
    };
    return wallTypeMap[wallType] || wallType;
  }
}