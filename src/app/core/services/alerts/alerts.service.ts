import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  error(text: string) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text
    });
  }

  success(text: string) {
    return Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text
    });
  }
  async delete(): Promise<Boolean> {
    const result = Swal.fire({
  title: "Estas seguro?",
  text: "No podrás revertir esto!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si, eliminar!"
  });
  return (await result).isConfirmed;
  }
}



