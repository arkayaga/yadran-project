import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsRouteComponent } from './organization-details/details-route/details-route.component';
import { OrganizationDetailsComponent } from './organization-details/organization-details.component';
import { OrganizationComponent } from './organization.component';

const routes: Routes = [
  { path: '', component: OrganizationComponent },
  { path: 'new', component: OrganizationDetailsComponent },
  { path: ':id', component: DetailsRouteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
