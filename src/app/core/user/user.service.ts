import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { Response } from '../api/api.model';
import { Role } from 'core/role/role.modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://test.yadranyonetim.com/api/User';

  constructor(private http: HttpClient) { }

  getUser(): Observable<Response<User[]>> {
    return this.http.get<Response<User[]>>(this.url)
  }

  addUser(value: Role): Observable<Response<Role[]>> {
    return this.http.post<Response<Role[]>>(this.url, value)
  }

  editUser(value: Role): Observable<Response<Role>> {
    return this.http.put<Response<Role>>(this.url, value)
  }

  deleteUser(id: string): Observable<Response<Role>> {
    return this.http.delete<Response<Role>>(this.url + '/' + id)

  }
}
