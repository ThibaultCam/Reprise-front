import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../core/services/weatherService';
import { WeatherForecast } from './weather';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  weather: WeatherForecast = { temperatureC: 0, temperatureF: 0, summary: '' };
  vocab: string = "";
  constructor(private _weatherService: WeatherService) {

  }
  ngOnInit(): void {
    this._weatherService.getWeather().subscribe({
      next: data => {
        this.weather = data[0];
        console.log('Météo reçue:', this.weather);
      },
      error: err => console.error('Erreur:', err)
    });
  }

  loadWeather(): void {
    this._weatherService.getWeather().subscribe({
      next: data => {
        this.weather = data[0];
        console.log('Météo reçue:', this.weather);
      },
      error: err => console.error('Erreur:', err)
    });
  }

  loadVocab(): void {
    this._weatherService.getMot().subscribe({
      next: data => {
        this.vocab = data.mot;
        console.log('Météo reçue:', data);
      },
      error: err => console.error('Erreur:', err)
    });
  }
}
