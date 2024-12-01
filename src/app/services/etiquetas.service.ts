import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class EtiquetasService {
  private API_Etiquetas = "http://localhost:3000/etiquetas";

  constructor(private http: HttpClient) { }

  getEtiquetas(): Observable<any> {
    return this.http.get(this.API_Etiquetas);
  }

  getEtiqueta(id: string): Observable<any> {
    return this.http.get(`${this.API_Etiquetas}/${id}`);
  }

}
