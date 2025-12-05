import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../models/serie';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private readonly apiUrl = 'https://localhost:7123';

  constructor(private http: HttpClient) { }

  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(`${this.apiUrl}/serie`);
  }

  getSerieById(id: string): Observable<Serie> {
    return this.http.get<Serie>(`${this.apiUrl}/serie/${id}`);
  }
}
