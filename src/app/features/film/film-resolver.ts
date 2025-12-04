import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Film } from '../../core/models/film';
import { MoviesService } from '../../core/services/movies.service';

@Injectable({
  providedIn: 'root'
})
export class FilmResolver implements Resolve<Film> {
  constructor(private filmService: MoviesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Film> {
    const id = route.paramMap.get('id');
    return this.filmService.getFilmById(id!);
  }
}