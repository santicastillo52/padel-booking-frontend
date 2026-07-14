import { Component, inject, OnDestroy } from '@angular/core';
import { ClubsService } from '../../../core/services/clubs/clubs.service';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { Club } from '../../../core/models/club.model';
import { Router } from '@angular/router';
import { Court } from '../../../core/models/court.model';
import { Subject, takeUntil } from 'rxjs';
import { CourtService } from '../../../core/services/court/court.service';
import { API_BASE_URL } from '../../../shared/utils';

import { UiButtonComponent, UiCardComponent } from '../../../shared/ui';

@Component({
  selector: 'app-court-list',
  standalone: true,
  imports: [UiCardComponent, UiButtonComponent],
  templateUrl: './court-list.component.html',
  styleUrl: './court-list.component.scss'
})
export class CourtListComponent implements OnDestroy {
  private readonly clubsService = inject(ClubsService);
  private readonly courtService = inject(CourtService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();
  readonly apiUrl = API_BASE_URL;

  club: Club | null = null;

  ngOnInit() {
    this.getMyClub();

    this.courtService.courtsChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getMyClub();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getMyClub() {
    this.clubsService.getMyClub()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.club = response;
        },
        error: (error) => {
          console.error('Error fetching club data:', error);
        }
      });
  }

  editCourt(court: Court) {
    this.router.navigate(['/courts/detail', court.id]);
  }
}
