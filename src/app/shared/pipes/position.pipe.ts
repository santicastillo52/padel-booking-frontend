import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'position',
    standalone: true
})

export class PositionPipe implements PipeTransform {
    transform(position: string | undefined): string {
        if (!position) {
            return 'No especificado';
        }
        
        const positionMap: {[key: string]: string } = {
            'both': 'Drive-Revés',
            'backhand': 'Revés',
            'forehand' : 'Drive'
        }
        return positionMap[position] || position;
    }
}

