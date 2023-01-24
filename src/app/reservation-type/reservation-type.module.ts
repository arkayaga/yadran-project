import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationTypeRoutingModule } from './reservation-type-routing.module';
import { ReservationTypeComponent } from './reservation-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';


@NgModule({
  declarations: [
    ReservationTypeComponent,
    ReservationDetailsComponent
  ],
  imports: [
    CommonModule,
    ReservationTypeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    ReservationDetailsComponent
  ]
})
export class ReservationTypeModule { }
