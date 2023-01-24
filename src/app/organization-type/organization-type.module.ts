import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationTypeRoutingModule } from './organization-type-routing.module';
import { OrganizationTypeComponent } from './organization-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TypeDetailsComponent } from './type-details/type-details.component';


@NgModule({
  declarations: [
    OrganizationTypeComponent,
    TypeDetailsComponent
  ],
  imports: [
    CommonModule,
    OrganizationTypeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    TypeDetailsComponent
  ]
})
export class OrganizationTypeModule { }
