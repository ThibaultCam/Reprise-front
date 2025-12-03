import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { WeatherForecast } from '../../features/home/home-page/weather';

/**
 * WeatherService
 * - Fournit des méthodes simples pour récupérer la météo via OpenWeatherMap.
 * - Nécessite une clé API OpenWeatherMap (paramètre `apiKey`).
 * - Utilise `HttpClient` fourni par l'application (voir `app.config.ts`).
 */
@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiUrl = 'https://localhost:7123';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(`${this.apiUrl}/WeatherForecast`);
  }

  getMot(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Vocab/1`);
  }
}
