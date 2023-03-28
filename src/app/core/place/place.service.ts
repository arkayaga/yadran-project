import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../api/api.model';
import { Place, PlaceRequest } from './place.model';

@Injectable({ providedIn: 'root' })

export class PlaceService {
  url = 'http://test.yadranyonetim.com/api/Place';

  constructor(
    private http: HttpClient) { }

  getPlaces(): Observable<Response<Place[]>> {
    return this.http.get<Response<Place[]>>(this.url)
  }

  addPlace(request: PlaceRequest): Observable<Response<Place[]>> {
    return this.http.post<Response<Place[]>>(this.url, request)
  }

  getPlace(id: string): Observable<Response<Place>> {
    return this.http.get<Response<Place>>(this.url + '/' + id)
  }

  editPlace(request: PlaceRequest): Observable<Response<Place>> {
    return this.http.put<Response<Place>>(this.url, request)
  }

  deletePlace(id: string): Observable<Response<Place>> {
    return this.http.delete<Response<Place>>(this.url + '/' + id)

  }
}



