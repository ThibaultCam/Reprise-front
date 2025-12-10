import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/modules/materialModule';
import { Film } from '../../core/models/film';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserDataFilmService } from '../../core/services/userDataFilm.service';
import { ClaimService } from '../../core/services/claim.service';

@Component({
  selector: 'app-film',
  imports: [CommonModule, MaterialModule],
  templateUrl: './film.html',
  styleUrl: './film.scss',
})
export class FilmComponent implements OnInit {
  film!: Film;
  isConnected$: any;

  get userRating(): number {
    return this.film.userRate ?? 0;
  }

  set userRating(value: number) {
    this.film.userRate = value;
  }

  constructor(private route: ActivatedRoute,
    private userDataFilmService: UserDataFilmService,
    private cdr: ChangeDetectorRef,
    private claimService: ClaimService) { 
      this.isConnected$ = this.claimService.connected$;
    }

  ngOnInit(): void {
    this.film = this.route.snapshot.data['film'];
    this.film.averageRating = 3;
  }

  rateFilm(star: number) {
    this.userDataFilmService.updateFilmRateObs(star, this.film.id).subscribe(() => {
      this.userRating = star;
      this.cdr.detectChanges();
    });
  }

  filmAverageRating(): number {
    return this.film.averageRating ?? 0;
  }
}

