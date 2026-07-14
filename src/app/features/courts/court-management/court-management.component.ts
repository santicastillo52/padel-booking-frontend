import { Component } from '@angular/core';
import { CourtFormComponent } from '../court-form/court-form.component';
import { CourtListComponent } from '../court-list/court-list.component';

import { UiPageHeaderComponent } from '../../../shared/ui';

@Component({
  selector: 'app-court-management',
  standalone: true,
  imports: [CourtListComponent, CourtFormComponent, UiPageHeaderComponent],
  templateUrl: './court-management.component.html',
  styleUrl: './court-management.component.scss'
})
export class CourtManagementComponent {

  
}
