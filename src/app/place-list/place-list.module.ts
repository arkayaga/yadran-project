import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceListRoutingModule } from './place-list-routing.module';
import { PlaceListComponent } from './place-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PlaceListComponent,
    PlaceDetailsComponent,
  ],
  imports: [
    CommonModule,
    PlaceListRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [
  ]
})
export class PlaceListModule { }
