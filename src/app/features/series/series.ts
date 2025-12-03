import { Component, OnInit } from '@angular/core';
import { Serie } from '../../core/models/serie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-series',
  imports: [],
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

}
