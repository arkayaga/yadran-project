import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceTransactionRoutingModule } from './place-transaction-routing.module';
import { PlaceTransactionComponent } from './place-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PlaceTransactionComponent
  ],
  imports: [
    CommonModule,
    PlaceTransactionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class PlaceTransactionModule { }
