import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(private authService: AuthService) { }

  menu = [
    { url: "/place-list", name: 'Mekanlar' },
    { url: "/organization-cost", name: 'Organizasyon Gelir Gider' },
    { url: "/reservation-type", name: 'Rezervasyon Tipi' },
    { url: "/organization-type", name: 'Organizasyon Tipi' },
    { url: "/organization-status", name: 'Organizasyon Durumu' },

  ]

  onLogout() {
    this.authService.logout();
  }

}


