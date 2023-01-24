import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from './reservation.model';
import { Response } from '../api.model';


@Injectable({
  providedIn: 'root'
})
export class ReservationTypeService {
  url = 'http://test.yadranyonetim.com/api/ReservationType';

  constructor(private http: HttpClient) { }

  getResesType(): Observable<Response<Reservation[]>> {
    return this.http.get<Response<Reservation[]>>(this.url)
  }

  addResType(value: Reservation): Observable<Response<Reservation[]>> {
    return this.http.post<Response<Reservation[]>>(this.url, value)
  }

  getResType(id: string): Observable<Response<Reservation>> {
    return this.http.get<Response<Reservation>>(this.url + '/' + id)
  }

  editResType(value: Reservation): Observable<Response<Reservation>> {
    return this.http.put<Response<Reservation>>(this.url, value)
  }

  deleteResType(id: string): Observable<Response<Reservation>> {
    return this.http.delete<Response<Reservation>>(this.url + '/' + id)

  }

}
