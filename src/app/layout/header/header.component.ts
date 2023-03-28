import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from '../../core/sidenav.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  language = new FormControl('tr');
  langs = [];

  links = [
    { label: 'Organizasyon', path: '/organization' },
    { label: 'Organizasyon Kopya', path: '/organization-copy' },
    { label: 'Array Task', path: '/task' },
  ];

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private sidenav: SidenavService
  ) {
    this.langs = this.translate.getLangs();
  }

  onLogout() {
    this.authService.logout();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  onToggle() {
    this.sidenav.toggle();
  }
}


