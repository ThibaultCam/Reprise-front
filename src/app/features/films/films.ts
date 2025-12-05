import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../../core/models/film';
import { MediaType } from '../../core/enums/mediaType';
import { MediaTileList } from '../../shared/components/media-tile-list/media-tile-list';

@Component({
  selector: 'app-films',
  imports: [MediaTileList],
  templateUrl: './films.html',
  styleUrl: './films.scss',
})
export class Films implements OnInit {
  films: Film[] = [];
  type = MediaType.FILM

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.films = this.route.snapshot.data['films'];
  }
}
