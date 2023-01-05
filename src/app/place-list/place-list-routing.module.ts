import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { PlaceListComponent } from './place-list.component';

const placeRoutes: Routes = [
  { path: '', component: PlaceListComponent },
  { path: 'new', component: PlaceDetailsComponent },
  { path: ':id', component: PlaceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(placeRoutes)],
  exports: [RouterModule]
})
export class PlaceListRoutingModule { }
