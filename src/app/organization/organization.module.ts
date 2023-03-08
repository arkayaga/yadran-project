import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { DetailsModalComponent } from './organization-details/details-modal/details-modal.component';
import { DetailsRouteComponent } from './organization-details/details-route/details-route.component';
import { TaskComponent } from '../task/task.component';

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationDetailsComponent,
    DetailsModalComponent,
    DetailsRouteComponent,
    TaskComponent,

  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    OrganizationDetailsComponent,
    DetailsModalComponent,
    DetailsRouteComponent,
    TaskComponent,
  ]
})
export class OrganizationModule { }
