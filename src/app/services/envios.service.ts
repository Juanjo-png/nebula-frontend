import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { libro } from '../models/libro.model';
import { envio } from '../models/envio.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnviosService {

  private API_Envios = `${environment.API_BACK}/envios`;

  constructor(private http: HttpClient) { }

  getEnvios(): Observable<any> {
    return this.http.get(this.API_Envios);
  }

  getEnvio(id: string): Observable<any> {
    return this.http.get(`${this.API_Envios}/${id}`);
  }

  getEnvioPorUsuario(id: string): Observable<any> {
    return this.http.get(`${this.API_Envios}/usuario/${id}`);
  }

  crearEnvio(data:envio){
    return this.http.post(this.API_Envios, data);
  }

  updateEnvio(id: string, libro: envio): Observable<any> {
    return this.http.put(`${this.API_Envios}/${id}`, libro);
  }

  cancelarEnvio(id: string): Observable<any> {
    return this.http.put(`${this.API_Envios}/cancelar/${id}`, {});
  }

  deleteEnvio(id:any){
    return this.http.delete(`${this.API_Envios}/${id}`);
  }

}
