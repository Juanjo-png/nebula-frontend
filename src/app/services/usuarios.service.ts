import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private API_Usuarios = `${environment.API_BACK}/usuarios`;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.API_Usuarios);
  }

  getUsuario(nombre: string): Observable<any> {
    return this.http.get(`${this.API_Usuarios}/${nombre}`);
  }

  getUsuarioByID(id: string): Observable<any> {
    return this.http.get(`${this.API_Usuarios}/id/${id}`);
  }

  recuperarContra(nombre: string, pregunta: string): Observable<any> {
    return this.http.get(`${this.API_Usuarios}/recuperarContra/${nombre}/${pregunta}`);
  }

  register(usuario: usuario): Observable<any> {
    return this.http.post(`${this.API_Usuarios}`,usuario)
  }

  login(usuario: usuario): Observable<string> {
    return this.http.post<string>(`${this.API_Usuarios}/login`,usuario)
  }

  updateUsuario(id: string, usuario: usuario): Observable<any> {
    return this.http.put(`${this.API_Usuarios}/${id}`, usuario);
  }

  updateUsuarioContra(id: string, data: any): Observable<any> {
    return this.http.put(`${this.API_Usuarios}/recuperarContra/${id}`, data);
  }

}
