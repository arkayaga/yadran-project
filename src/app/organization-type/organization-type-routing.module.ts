import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationTypeComponent } from './organization-type.component';
import { TypeDetailsComponent } from './type-details/type-details.component';

const routes: Routes = [
  { path: '', component: OrganizationTypeComponent },
  { path: 'new', component: TypeDetailsComponent },
  { path: ':id', component: TypeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationTypeRoutingModule { }
