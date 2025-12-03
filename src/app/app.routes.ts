import { Routes } from '@angular/router';
import { Films } from './features/films/films';
import { FilmResolver } from './features/films/films-resolver';
import { Series } from './features/series/series';
import { SeriesResolver } from './features/series/series-resolver';

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
            films: FilmResolver
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
