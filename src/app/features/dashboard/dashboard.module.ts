import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LandingPageComponent,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { } 