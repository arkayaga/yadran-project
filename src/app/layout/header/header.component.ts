import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  links = [
    { label: 'Organizasyon', path: '/organization' },
    { label: 'Organizasyon Kopya', path: '/organization-copy' },
    { label: 'Array Task', path: '/task' },
  ];

  constructor(
    private authService: AuthService,
  ) { }

  onLogout() {
    this.authService.logout();
  }

}


