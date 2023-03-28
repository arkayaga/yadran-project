import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from './role.modal';
import { Response } from '../api/api.model';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  url = 'http://test.yadranyonetim.com/api/Role';

  constructor(private http: HttpClient) { }

  getRole(): Observable<Response<Role[]>> {
    return this.http.get<Response<Role[]>>(this.url)
  }
}
