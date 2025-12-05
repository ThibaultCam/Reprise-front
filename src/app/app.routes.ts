import { Routes } from '@angular/router';
import { Films } from './features/films/films';
import { FilmsResolver } from './features/films/films-resolver';
import { Series } from './features/series/series';
import { SeriesResolver } from './features/series/series-resolver';
import { FilmComponent } from './features/film/film';
import { FilmResolver } from './features/film/film-resolver';
import { SerieResolver } from './features/serie/serie-resolver';
import { SerieComponent } from './features/serie/serie';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule)
    },
    {
        path: 'films',
        component: Films,
        resolve: {
            films: FilmsResolver
        }
    },
    {
        path: 'film/:id',
        component: FilmComponent,
        resolve: {
            film: FilmResolver
        }
    },
    {
        path: 'serie/:id',
        component: SerieComponent,
        resolve: {
            serie: SerieResolver
        }
    },
    {
        path: 'series',
        component: Series,
        resolve: {
            series: SeriesResolver
        }
    },
    { path: '**', redirectTo: 'auth/login' }
];
