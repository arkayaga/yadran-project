import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceTransactionComponent } from './place-transaction.component';

const routes: Routes = [{ path: '', component: PlaceTransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceTransactionRoutingModule { }
