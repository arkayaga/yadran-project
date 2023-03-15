import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationCopyComponent } from './organization-copy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrganizationCopyRoutingModule } from './organization-copy-routing.module';

@NgModule({
  declarations: [
    OrganizationCopyComponent,
  ],
  imports: [
    CommonModule,
    OrganizationCopyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class OrganizationCopyModule { }

