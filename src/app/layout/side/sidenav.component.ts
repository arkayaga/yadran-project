import { Component } from '@angular/core';
import { SidenavService } from '../../core/sidenav.service';
import { AuthService } from '../../auth/auth.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  checked = true;

  constructor(
    private authService: AuthService,
    public sidenav: SidenavService
  ) { }

  menu = [
    { url: "/place-transaction", name: 'Kasa Yonetimi' },
    { url: "/place-list", name: 'Mekanlar' },
    { url: "/organization-cost", name: 'Organizasyon Gelir Gider' },
    { url: "/reservation-type", name: 'Rezervasyon Tipi' },
    { url: "/organization-type", name: 'Organizasyon Tipi' },
    { url: "/organization-status", name: 'Organizasyon Durumu' },

  ]

  onLogout() {
    this.authService.logout();
  }

  onChecked(event: MatCheckboxChange) {
    this.checked = event.checked
    this.sidenav.setValue(event.checked)
  }


  mouseover(event: MouseEvent) {
    if (event.type === 'mouseover') {
      if (this.checked === false) {
        this.checked = true
      }
    }
  };

  mouseout(event: MouseEvent) {
    if (this.checked === false) {
      if (event.type === 'mouseout') {
        this.checked = false
      }
    }
  };
}


