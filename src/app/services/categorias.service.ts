import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private API_Categorias = `${environment.API_BACK}/categorias`;

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get(this.API_Categorias);
  }

  getCategoria(id: string): Observable<any> {
    return this.http.get(`${this.API_Categorias}/${id}`);
  }
}
