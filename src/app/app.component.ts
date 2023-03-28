import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, User } from './auth/auth.service';
import localeTr from '@angular/common/locales/tr';
import localeEn from '@angular/common/locales/en';
@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService,
    private translate: TranslateService
  ) {

    this.translate.addLangs(['tr', 'en']);
    translate.setDefaultLang('tr');
    // translate.use(translate.getBrowserLang());
    registerLocaleData(localeTr, 'tr-TR');
    registerLocaleData(localeEn, 'en-US');
  }
  user: User

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      this.authService.handleUser(user);
    }
  }
}


