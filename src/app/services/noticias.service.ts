import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { noticia } from '../models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private API_Noticias = "http://localhost:3000/noticias";

  constructor(private http: HttpClient) { }

  getNoticias(): Observable<any> {
    return this.http.get(this.API_Noticias);
  }

  getNoticia(id: string): Observable<any> {
    return this.http.get(`${this.API_Noticias}/${id}`);
  }

  crearNoticia(data:noticia){
    return this.http.post(this.API_Noticias, data);
  }

  updateNoticia(id: string, noticia: noticia): Observable<any> {
    return this.http.put(`${this.API_Noticias}/${id}`, noticia);
  }

  deleteNoticia(id:any){
    return this.http.delete(`${this.API_Noticias}/${id}`);
  }
}
