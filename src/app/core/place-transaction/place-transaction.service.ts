import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../api/api.model';
import { PlaceTransaction } from './place-transaction.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceTransactionService {
  url = 'http://test.yadranyonetim.com/api/PlaceTransaction';

  constructor(private http: HttpClient) { }

  getPlaceTransactions(id: string): Observable<Response<PlaceTransaction>> {
    return this.http.get<Response<PlaceTransaction>>(this.url + '/GetPlaceTransactions/' + id)
  }

  addMoneyToPlaceCashbox(request: any): Observable<Response<PlaceTransaction[]>> {
    return this.http.post<Response<PlaceTransaction[]>>(this.url + '/AddMoneyToPlaceCashbox', request)
  }

  getPlaceCashboxAmount(id: string): Observable<Response<number>> {
    return this.http.get<Response<number>>(this.url + '/GetPlaceCashboxAmount/' + id)
  }
}
