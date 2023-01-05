import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationCost } from './organization.model';
import { Response } from '../api.model';


@Injectable({
  providedIn: 'root'
})
export class OrganizationCostService {
  url = 'http://test.yadranyonetim.com/api/OrganizationCostRecipe';

  constructor(private http: HttpClient) { }

  getOrganizations(): Observable<Response<OrganizationCost[]>> {
    return this.http.get<Response<OrganizationCost[]>>(this.url)
  }

  addOrganization(value: OrganizationCost): Observable<Response<OrganizationCost[]>> {
    return this.http.post<Response<OrganizationCost[]>>(this.url, value)
  }

  getOrganization(id: string): Observable<Response<OrganizationCost>> {
    return this.http.get<Response<OrganizationCost>>(this.url + '/' + id)
  }

  editOrganization(value: OrganizationCost): Observable<Response<OrganizationCost>> {
    return this.http.put<Response<OrganizationCost>>(this.url, value)
  }

  deleteOrganization(id: string): Observable<Response<OrganizationCost>> {
    return this.http.delete<Response<OrganizationCost>>(this.url + '/' + id)
  }

}