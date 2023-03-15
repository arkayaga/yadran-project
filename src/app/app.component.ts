import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, User } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private translate: TranslateService) {

    this.translate.addLangs(['tr', 'en']);
    this.translate.setDefaultLang('tr');
  }
  user: User

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      this.authService.handleUser(user);
    }
  }
}


