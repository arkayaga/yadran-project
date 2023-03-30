import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceTransactionRequestRoutingModule } from './place-transaction-request-routing.module';
import { PlaceTransactionRequestComponent } from './place-transaction-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DetailsPlaceTransactionRequestComponent } from './details-place-transaction-request/details-place-transaction-request.component';


@NgModule({
  declarations: [
    PlaceTransactionRequestComponent,
    DetailsPlaceTransactionRequestComponent
  ],
  imports: [
    CommonModule,
    PlaceTransactionRequestRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    DetailsPlaceTransactionRequestComponent
  ]
})
export class PlaceTransactionRequestModule { }
