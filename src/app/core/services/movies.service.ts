import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly apiUrl = 'https://localhost:7123';

  constructor(private http: HttpClient) {}

  getFilms(): Observable<Film[]> {
      return this.http.get<Film[]>(`${this.apiUrl}/film`);
    }
}
