import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../../core/models/film';

@Component({
  selector: 'app-films',
  imports: [],
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

}
