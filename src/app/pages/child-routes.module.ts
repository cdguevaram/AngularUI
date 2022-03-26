import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';


const childRoutes: Routes = [
  // tslint:disable-next-line:max-line-length
  { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Inicio'} },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

];



@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class ChildRoutesModule { }
