import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesService } from '../../core/services/movies.service';
import { Film } from '../../core/models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmsResolver implements Resolve<Film[]> {
  constructor(private moviesService: MoviesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Film[]> {
    return this.moviesService.getFilms();
  }
}