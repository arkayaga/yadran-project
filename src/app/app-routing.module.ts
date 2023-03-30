import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './home/guest.guard';
import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [GuestGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'organization', loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule) },
      { path: 'organization-copy', loadChildren: () => import('./organization-copy/organization-copy.module').then(m => m.OrganizationCopyModule) },
      { path: 'task', component: TaskComponent },
      { path: 'place-list', loadChildren: () => import('./place-list/place-list.module').then(m => m.PlaceListModule) },
      { path: 'organization-cost', loadChildren: () => import('./organization-cost/organization-cost.module').then(m => m.OrganizationCostModule) },
      { path: 'reservation-type', loadChildren: () => import('./reservation-type/reservation-type.module').then(m => m.ReservationTypeModule) },
      { path: 'organization-type', loadChildren: () => import('./organization-type/organization-type.module').then(m => m.OrganizationTypeModule) },
      { path: 'organization-status', loadChildren: () => import('./organization-status/organization-status.module').then(m => m.OrganizationStatusModule) },
      { path: 'place-transaction-request', loadChildren: () => import('./place-transaction-request/place-transaction-request.module').then(m => m.PlaceTransactionRequestModule) },

    ]
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
