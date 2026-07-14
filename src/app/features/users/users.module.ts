import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { UsersProfileComponent } from "./users-profile/users-profile.component";



const routes: Routes = [
    { path: 'profile', component: UsersProfileComponent },

];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        UsersProfileComponent,
        RouterModule.forChild(routes)
    ]
})
export class UsersModule { }