import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationCopyComponent } from './organization-copy.component';

const routes: Routes = [
  { path: '', component: OrganizationCopyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationCopyRoutingModule { }
