import { Component, OnInit } from '@angular/core';
import { AuthService, User } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }
  user: User

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      this.authService.handleUser(user);
    }
  }
}


