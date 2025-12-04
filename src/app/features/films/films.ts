import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../../core/models/film';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Genre } from '../../core/models/genre';

@Component({
  selector: 'app-films',
  imports: [MatCardModule, MatButtonModule, CommonModule ],
  templateUrl: './films.html',
  styleUrl: './films.scss',
})
export class Films implements OnInit {
  films: Film[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.films = this.route.snapshot.data['films'];
    console.log(this.films);
  }

  inlineGenres(genres: Genre[]): string {
    return genres.map(genre => genre.name).join(', ');
  }

  goToMovie(filmId: string): void {
    window.location.href = `/film/${filmId}`;
  }
}
