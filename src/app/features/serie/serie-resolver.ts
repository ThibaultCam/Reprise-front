import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Serie } from '../../core/models/serie';
import { SeriesService } from '../../core/services/series.service';

@Injectable({
  providedIn: 'root'
})
export class SerieResolver implements Resolve<Serie> {
  constructor(private serieService: SeriesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Serie> {
    const id = route.paramMap.get('id');
    return this.serieService.getSerieById(id!);
  }
}