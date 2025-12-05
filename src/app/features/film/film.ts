import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/modules/materialModule';
import { Film } from '../../core/models/film';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-film',
  imports: [CommonModule, MaterialModule],
  templateUrl: './film.html',
  styleUrl: './film.scss',
})
export class FilmComponent implements OnInit {
  film!: Film;
  userRating = 5;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.film = this.route.snapshot.data['film'];
    this.film.averageRating = 3;
  }

  rateFilm(star: number) {
    this.userRating = star;
  }

  filmAverageRating() : number {
    return this.film.averageRating ?? 0;
  }
}

