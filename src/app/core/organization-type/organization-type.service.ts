import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationType } from './organization-type.model';
import { Response } from '../api/api.model';


@Injectable({
  providedIn: 'root'
})
export class OrganizationTypeService {

  url = 'http://test.yadranyonetim.com/api/OrganizationType';

  constructor(private http: HttpClient) { }

  getOrgsType(): Observable<Response<OrganizationType[]>> {
    return this.http.get<Response<OrganizationType[]>>(this.url)
  }

  addOrgType(value: OrganizationType): Observable<Response<OrganizationType[]>> {
    return this.http.post<Response<OrganizationType[]>>(this.url, value)
  }

  getOrgType(id: string): Observable<Response<OrganizationType>> {
    return this.http.get<Response<OrganizationType>>(this.url + '/' + id)
  }

  editOrgType(value: OrganizationType): Observable<Response<OrganizationType>> {
    return this.http.put<Response<OrganizationType>>(this.url, value)
  }

  deleteOrgType(id: string): Observable<Response<OrganizationType>> {
    return this.http.delete<Response<OrganizationType>>(this.url + '/' + id)

  }
}
