import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  mybool: boolean;
  links = [
    { label: 'Organizasyon', path: '/organization' },
    { label: 'Organizasyon Kopya', path: '/organization-copy' },
    { label: 'Array', path: '/' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.router.url === '/organization') {
      this.mybool = false;
    }
  }

  onLogout() {
    this.authService.logout();
  }

}


