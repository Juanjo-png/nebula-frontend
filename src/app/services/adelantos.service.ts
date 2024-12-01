import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdelantosService {
  private API_Adelantos = "http://localhost:3000/adelantos";

  constructor(private http: HttpClient) { }

  getAdelanto(id: string): Observable<any> {
    return this.http.get(`${this.API_Adelantos}/${id}`);
  }
}
