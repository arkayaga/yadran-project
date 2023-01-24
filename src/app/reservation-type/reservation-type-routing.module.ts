import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationTypeComponent } from './reservation-type.component';

const routes: Routes = [
  { path: '', component: ReservationTypeComponent },
  { path: 'new', component: ReservationDetailsComponent },
  { path: ':id', component: ReservationDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationTypeRoutingModule { }
