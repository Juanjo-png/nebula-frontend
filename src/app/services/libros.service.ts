import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { libro } from '../models/libro.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private API_Libros = `${environment.API_BACK}/libros`;

  constructor(private http: HttpClient) { }

  getLibros(): Observable<any> {
    return this.http.get(this.API_Libros);
  }

  getLibro(id: string): Observable<any> {
    return this.http.get(`${this.API_Libros}/${id}`);
  }

  getLibroEditar(id: string): Observable<any> {
    return this.http.get(`${this.API_Libros}/prueba/${id}`);
  }

  getLibrosPorSerie(id: string): Observable<any> {
    return this.http.get(`${this.API_Libros}/serie/${id}`);
  }

  getLibrosPorCategoria(id: string): Observable<any> {
    return this.http.get(`${this.API_Libros}/categoria/${id}`);
  }
  getLibrosPorEtiqueta(id: string): Observable<any> {
    return this.http.get(`${this.API_Libros}/etiqueta/${id}`);
  }
  getLibrosNovedades(id: string): Observable<any> {
    return this.http.get(`${this.API_Libros}/novedades/${id}`);
  }

  getLibrosNovedadesTodas(): Observable<any> {
    return this.http.get(`${this.API_Libros}/novedades/novedadesTodas`);
  }

  getSerie(id: string): Observable<any> {
    return this.http.get(`${environment.API_BACK}/series/${id}`);
  }

  getBuscarLibros(id: string): Observable<any> {
    return this.http.get(`${this.API_Libros}/buscar/${id}`);
  }

  crearLibro(data:libro){
    return this.http.post(this.API_Libros, data);
  }

  updateLibro(id: string, libro: libro): Observable<any> {
    return this.http.put(`${this.API_Libros}/${id}`, libro);
  }

  deleteLibro(id:any){
    return this.http.delete(`${this.API_Libros}/${id}`);
  }
}
