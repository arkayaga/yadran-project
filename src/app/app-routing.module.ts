import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './home/guest.guard';
import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [GuestGuard] },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'place-list', loadChildren: () => import('./place-list/place-list.module').then(m => m.PlaceListModule) },
      { path: 'organization-cost', loadChildren: () => import('./organization-cost/organization-cost.module').then(m => m.OrganizationCostModule) },
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
