import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceTransactionRoutingModule } from './place-transaction-routing.module';
import { PlaceTransactionComponent } from './place-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DetailsPlaceTransactionComponent } from './details-place-transaction/details-place-transaction.component';


@NgModule({
  declarations: [
    PlaceTransactionComponent,
    DetailsPlaceTransactionComponent
  ],
  imports: [
    CommonModule,
    PlaceTransactionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    DetailsPlaceTransactionComponent
  ]
})
export class PlaceTransactionModule { }
