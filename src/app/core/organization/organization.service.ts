import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from './organization.model';
import { Response } from '../api.model';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  url = 'http://test.yadranyonetim.com/api/Organization';

  constructor(private http: HttpClient) { }

  getOrganizations(): Observable<Response<Organization[]>> {
    return this.http.get<Response<Organization[]>>(this.url)
  }

  addOrganization(value: Organization): Observable<Response<Organization[]>> {
    return this.http.post<Response<Organization[]>>(this.url, value)
  }

  getOrganization(id: string): Observable<Response<Organization>> {
    return this.http.get<Response<Organization>>(this.url + '/' + id)
  }

  editOrganization(value: Organization): Observable<Response<Organization>> {
    return this.http.put<Response<Organization>>(this.url, value)
  }

  deleteOrganization(id: string): Observable<Response<Organization>> {
    return this.http.delete<Response<Organization>>(this.url + '/' + id)
  }
}
