import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class UserDataFilmService {
  private readonly apiUrl = 'https://localhost:7123';

  constructor(private http: HttpClient) { }

  updateFilmRate(rate: number, filmId: string) {
    const body = { rate, filmId };
    return firstValueFrom(this.http.post(`${this.apiUrl}/UserDataFilm/update`, body));
  }

  updateFilmRateObs(rate: number, filmId: string): Observable<any> {
    const body = { rate, filmId };
    return this.http.post(`${this.apiUrl}/UserDataFilm/update`, body);
  }


  getFilmById(id: string): Observable<Film> {
    return this.http.get<Film>(`${this.apiUrl}/film/${id}`);
  }
}
