import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationCostRoutingModule } from './organization-cost-routing.module';
import { CostDetailsComponent } from './cost-details/cost-details.component';
import { OrganizationCostComponent } from './organization-cost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OrganizationCostComponent,
    CostDetailsComponent,

  ],
  imports: [
    CommonModule,
    OrganizationCostRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
  ]
})
export class OrganizationCostModule { }
