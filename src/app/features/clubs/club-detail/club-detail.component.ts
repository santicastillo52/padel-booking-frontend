import { Component, inject } from '@angular/core';
import { ClubsService } from '../../../core/services/clubs/clubs.service';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from '../../../core/models/club.model';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { API_BASE_URL } from '../../../shared/utils';
import { CourtTypePipe, WallTypePipe } from '../../../shared/pipes';

import { UiBadgeComponent, UiCardComponent, UiPageHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-club-detail',
  standalone: true,
  imports: [CommonModule, CourtTypePipe, WallTypePipe, UiCardComponent, UiBadgeComponent, UiPageHeaderComponent],
  templateUrl: './club-detail.component.html',
  styleUrl: './club-detail.component.scss',
})
export class ClubDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clubsService = inject(ClubsService);
  private readonly authService = inject(AuthService);
  private readonly destroy$ = new Subject<void>();
  apiUrl = API_BASE_URL;

  club: Club | null = null;
  role: string | null = null;

  ngOnInit() {
    const clubId = this.route.snapshot.paramMap.get('id');
    const user = this.authService.getUser();

    if (clubId) {
      this.getClubById(Number(clubId));
      this.role = 'user';
    } else {
      this.getMyClub();
      this.role = 'admin';
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  getClubById(id: number) {
    this.clubsService.getClubById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.club = response;
      },
      error: (error) => {
        console.error('Error fetching club by ID:', error);
      },
    });
  }

  getMyClub() {
    this.clubsService.getMyClub().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.club = response;
      },
      error: (error) => {
        console.error('Error fetching club data:', error);
      },
    });
  }



  getUserId() {
    const userId = this.authService.getUser().id;
    return userId;
  }
}
