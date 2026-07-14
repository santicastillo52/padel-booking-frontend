import { Component, inject, OnDestroy } from '@angular/core';
import { ClubsService } from '../../../core/services/clubs/clubs.service';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Club } from '../../../core/models/club.model';
import { Subject, takeUntil } from 'rxjs';
import { API_BASE_URL } from '../../../shared/utils';

import { UiBadgeComponent, UiCardComponent } from '../../../shared/ui';

@Component({
  selector: 'app-club-list',
  standalone: true,
  imports: [CommonModule, UiCardComponent, UiBadgeComponent],
  templateUrl: './club-list.component.html',
  styleUrl: './club-list.component.scss',
})
export class ClubListComponent implements OnDestroy {
  clubs: Club[] = [];
  club: any;
  apiUrl = API_BASE_URL;

  private readonly clubsService = inject(ClubsService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  ngOnInit() {
    this.getClubs();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getClubs() {
    this.clubsService.getClubs()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.clubs = response;
        },
        error: (error) => {
          console.error('Error fetching clubs:', error);
        },
      });
  }

  getClub(id: number) {
    this.router.navigate(['/clubs/detail', id]);
  }
}
