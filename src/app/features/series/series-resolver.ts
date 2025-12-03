import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Serie } from '../../core/models/serie';
import { MoviesService } from '../../core/services/movies.service';
import { Observable } from 'rxjs';
import { SeriesService } from '../../core/services/series.service';

@Injectable({
  providedIn: 'root',
})
export class SeriesResolver implements Resolve<Serie[]> {
  constructor(private seriesService: SeriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Serie[]> {
    return this.seriesService.getSeries();
  }
}
