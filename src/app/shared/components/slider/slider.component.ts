import { Component, inject } from '@angular/core';
import { ClubsService } from '../../../core/services/clubs/clubs.service';
import { Club } from '../../../core/models';
import { Subject, takeUntil } from 'rxjs';
import { API_BASE_URL } from '../../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
clubs: Club[] = [];
readonly apiUrl = API_BASE_URL;
welcomeImage = 'assets/files/welcome.jpeg';
imageDefault=  'assets/files/club2.jpg';
images: any[] = [];

private readonly destroy$ = new Subject<void>();
private readonly router = inject(Router);
private readonly clubsService = inject(ClubsService);

//Agrego un index para poder comunicarle a bootstrap el valor de data-bs-slide-to y aria-label 
  /*images = [
    { image: 'assets/files/club1.jpg', title: 'Club Talleres', index: "1" },
    { image: 'assets/files/club2.jpg', title: 'Club Belgrano', index: "2" },
    { image: 'assets/files/club3.jpg', title: 'Club Instituto', index: "3" }
  ];
*/


  
 

  ngOnInit(){
    this.getClubs();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getClubs(): void {
    this.clubsService.getClubs()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: Club[]) => {
          this.clubs = response;
        },
        error: (error) => {
          console.error('Error al obtener los clubs:', error);
        }
    })
  }
  getClub(id: number) {
    this.router.navigate(['/clubs/detail', id]);
  }
}
