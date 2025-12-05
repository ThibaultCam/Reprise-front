import { Component } from '@angular/core';
import { Serie } from '../../core/models/serie';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../shared/modules/materialModule';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-serie',
  imports: [CommonModule, MaterialModule],
  templateUrl: './serie.html',
  styleUrl: './serie.scss',
})
export class SerieComponent {
  serie!: Serie;
  userRating = 5;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.serie = this.route.snapshot.data['serie'];
    this.serie.averageRating = 3;
  }

  rateSerie(star: number) {
    this.userRating = star;
  }

  serieAverageRating(): number {
    return this.serie.averageRating ?? 0;
  }
}
