import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationDetailsComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    OrganizationDetailsComponent
  ]
})
export class OrganizationModule { }
