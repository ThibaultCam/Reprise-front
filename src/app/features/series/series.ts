import { Component, OnInit } from '@angular/core';
import { Serie } from '../../core/models/serie';
import { ActivatedRoute } from '@angular/router';
import { MediaTileList } from '../../shared/components/media-tile-list/media-tile-list';
import { MediaType } from '../../core/enums/mediaType';

@Component({
  selector: 'app-series',
  imports: [MediaTileList],
  templateUrl: './series.html',
  styleUrl: './series.scss',
})
export class Series implements OnInit {
  series: Serie[] = [];
  type = MediaType.SERIE

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.series = this.route.snapshot.data['series'];
  }
}
