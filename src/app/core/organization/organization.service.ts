import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization, OrganizationFilter } from './organization.model';
import { Response } from '../api.model';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  url = 'http://test.yadranyonetim.com/api/Organization';

  constructor(private http: HttpClient) { }

  getOrgs(): Observable<Response<Organization[]>> {
    return this.http.get<Response<Organization[]>>(this.url)
  }

  addOrg(value: Organization): Observable<Response<Organization[]>> {
    return this.http.post<Response<Organization[]>>(this.url, value)
  }

  getOrg(id: string): Observable<Response<Organization>> {
    return this.http.get<Response<Organization>>(this.url + '/' + id)
  }

  editOrg(value: Organization): Observable<Response<Organization>> {
    return this.http.put<Response<Organization>>(this.url, value)
  }

  deleteOrg(id: string): Observable<Response<Organization>> {
    return this.http.delete<Response<Organization>>(this.url + '/' + id)
  }

  filterOrgs(request: OrganizationFilter): Observable<Response<Organization[]>> {
    return this.http.post<Response<Organization[]>>(this.url + '/Filter', request)
  }
}
