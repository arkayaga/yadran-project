import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationStatusComponent } from './organization-status.component';

const routes: Routes = [{ path: '', component: OrganizationStatusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationStatusRoutingModule { }
