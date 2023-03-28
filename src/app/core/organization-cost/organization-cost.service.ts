import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationCost } from './organization-cost.model';
import { Response } from '../api/api.model';


@Injectable({
  providedIn: 'root'
})
export class OrganizationCostService {
  url = 'http://test.yadranyonetim.com/api/OrganizationCostRecipe';

  constructor(private http: HttpClient) { }

  getOrgsCost(): Observable<Response<OrganizationCost[]>> {
    return this.http.get<Response<OrganizationCost[]>>(this.url)
  }

  addOrgCost(value: OrganizationCost): Observable<Response<OrganizationCost[]>> {
    return this.http.post<Response<OrganizationCost[]>>(this.url, value)
  }

  getOrgCost(id: string): Observable<Response<OrganizationCost>> {
    return this.http.get<Response<OrganizationCost>>(this.url + '/' + id)
  }

  editOrgCost(value: OrganizationCost): Observable<Response<OrganizationCost>> {
    return this.http.put<Response<OrganizationCost>>(this.url, value)
  }

  deleteOrgCost(id: string): Observable<Response<OrganizationCost>> {
    return this.http.delete<Response<OrganizationCost>>(this.url + '/' + id)
  }

  getOrgCostActive(id: string): Observable<Response<OrganizationCost>> {
    return this.http.get<Response<OrganizationCost>>(this.url + '/Actives/' + id)
  }

}