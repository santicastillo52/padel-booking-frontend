import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status',
    standalone: true
})
export class StatusPipe implements PipeTransform {
    transform(status: string): string {
        const statusMap: {[key: string]: string } = {
            'pending': 'Pendiente...',
            'confirmed': 'Confirmado',
            'cancelled': 'Cancelado',
            'completed': 'Completado'
        }
        return statusMap[status] || status;
    }
}