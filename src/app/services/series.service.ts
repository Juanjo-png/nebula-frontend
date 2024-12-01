import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private API_Series = "http://localhost:3000/seriesLibros";

  constructor(private http: HttpClient) { }

  getTodasSeries() {
    return this.http.get(`${this.API_Series}`);
  }

  getSeries(id: string): Observable<any> {
    return this.http.get(`${this.API_Series}/${id}`);
  }

  getSerie(id: string): Observable<any> {
    return this.http.get(`${this.API_Series}/serie/${id}`);
  }

  getIMGSerie(id: string): Observable<any> {
    return this.http.get(`${this.API_Series}/img/${id}`);
  }
}
