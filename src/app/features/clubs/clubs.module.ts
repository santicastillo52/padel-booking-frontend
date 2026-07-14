import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ClubListComponent } from './club-list/club-list.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: 'list', component: ClubListComponent, canActivate: [AuthGuard] },
  { path: 'detail', component: ClubDetailComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: ClubDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClubListComponent,
    ClubDetailComponent,
    RouterModule.forChild(routes)
  ]
})
export class ClubsModule { } 