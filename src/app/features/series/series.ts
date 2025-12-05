import { Component, OnInit } from '@angular/core';
import { Serie } from '../../core/models/serie';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../../core/models/genre';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-series',
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './series.html',
  styleUrl: './series.scss',
})
export class Series implements OnInit {
  series: Serie[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.series = this.route.snapshot.data['series'];
    console.log(this.series);
  }

  goToSerie(serieId: string): void {
    window.location.href = `/serie/${serieId}`;
  }

  inlineGenres(genres: Genre[]): string {
      return genres.map(genre => genre.name).join(', ');
    }
}
