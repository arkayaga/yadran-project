import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostDetailsComponent } from './cost-details/cost-details.component';
import { OrganizationCostComponent } from './organization-cost.component';

const organizationRoutes: Routes = [
  { path: '', component: OrganizationCostComponent },
  { path: 'new', component: CostDetailsComponent },
  { path: ':id', component: CostDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(organizationRoutes)],
  exports: [RouterModule]
})
export class OrganizationCostRoutingModule { }
