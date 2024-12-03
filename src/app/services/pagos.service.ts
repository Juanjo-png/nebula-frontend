import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { libro } from '../models/libro.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private API_Pagos = `${environment.API_BACK}/pagos`;

  constructor(private http: HttpClient) { }

  generateOrder(data: { name: string, amount: number }): Observable<any> {
    return this.http.post(`${this.API_Pagos}/orders`, data)
  }

  sendPayment(token: string, id: string): Promise<any> {
    return this.http.patch(`${this.API_Pagos}/orders/${id}`,
      {
        token
      }).toPromise()
  }

  confirmOrder(id:string): Promise<any> {
    return this.http.patch(`${this.API_Pagos}/orders/confirm/${id}`, {}).toPromise()
  }

  getOrderDetail(id: string): Observable<any> {
    return this.http.get(`${this.API_Pagos}/orders/${id}`)
  }
}
