import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationStatus } from './organization-status.model';
import { Response } from '../api/api.model';


@Injectable({
  providedIn: 'root'
})
export class OrganizationStatusService {

  url = 'http://test.yadranyonetim.com/api/OrganizationStatus';

  constructor(private http: HttpClient) { }

  getOrgsStatus(): Observable<Response<OrganizationStatus[]>> {
    return this.http.get<Response<OrganizationStatus[]>>(this.url)
  }

  addOrgStatus(value: OrganizationStatus): Observable<Response<OrganizationStatus[]>> {
    return this.http.post<Response<OrganizationStatus[]>>(this.url, value)
  }

  getOrgStatus(id: string): Observable<Response<OrganizationStatus>> {
    return this.http.get<Response<OrganizationStatus>>(this.url + '/' + id)
  }

  editOrgStatus(value: OrganizationStatus): Observable<Response<OrganizationStatus>> {
    return this.http.put<Response<OrganizationStatus>>(this.url, value)
  }

  deleteOrgStatus(id: string): Observable<Response<OrganizationStatus>> {
    return this.http.delete<Response<OrganizationStatus>>(this.url + '/' + id)

  }
}
