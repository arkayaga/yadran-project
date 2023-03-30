import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceTransactionRequest } from './place-transaction-request.model';
import { Response } from '../api/api.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceTransactionRequestService {
  url = 'http://test.yadranyonetim.com/api/PlaceTransactionRequest';

  constructor(private http: HttpClient) { }

  getPlaceTransactionRequests(): Observable<Response<PlaceTransactionRequest[]>> {
    return this.http.get<Response<PlaceTransactionRequest[]>>(this.url)
  }

  getPlaceTransactionRequest(id: string): Observable<Response<PlaceTransactionRequest>> {
    return this.http.get<Response<PlaceTransactionRequest>>(this.url + '/' + id)
  }

  addPlaceTransactionRequest(value: FormData): Observable<Response<PlaceTransactionRequest[]>> {
    return this.http.post<Response<PlaceTransactionRequest[]>>(this.url, value)
  }

  deletePlaceTransactionRequest(id: string): Observable<Response<PlaceTransactionRequest>> {
    return this.http.delete<Response<PlaceTransactionRequest>>(this.url + '/' + id)
  }
}
