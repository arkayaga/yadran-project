import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationStatusRoutingModule } from './organization-status-routing.module';
import { OrganizationStatusComponent } from './organization-status.component';
import { StatusDetailsComponent } from './status-details/status-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OrganizationStatusComponent,
    StatusDetailsComponent
  ],
  imports: [
    CommonModule,
    OrganizationStatusRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    StatusDetailsComponent
  ]
})
export class OrganizationStatusModule { }
