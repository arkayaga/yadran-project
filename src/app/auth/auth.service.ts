import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id?: string;
  username: string;
  // token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  static getToken(): any {
    return JSON.parse(localStorage.getItem('_token'))
  }

  user = new BehaviorSubject<User | null>(null)
  // token = new Subject<Token>()
  errorMsg: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getUser() {
    return this.user
  }

  login(request: any) {
    return this.http.post<any>('http://test.yadranyonetim.com/api/Auth/Login',
      request)
      .pipe(
        tap(res => {
          console.log(res)
          const user = {
            username: res.data.username,
            id: res.data.id
          }
          this.handleUser(user)
          this.handleToken(res.data.token)
        }),
        catchError(err => {
          alert(JSON.stringify(err.error.responseException.exceptionMessage));
          return null;
        }
        ));
  }


  public handleUser(user: User) {
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  public handleToken(token: string) {
    localStorage.setItem('_token', JSON.stringify(token));
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!AuthService.getToken();
  }

}


//handleUser olustur
//handleToken


