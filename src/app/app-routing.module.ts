import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './index/login/login.component';
import { TvShowsComponent } from './shared/components/tv-shows/tv-shows.component';
import { MovieComponent } from './shared/components/movie/movie.component';
import { TopTvShowsComponent } from './shared/components/top-tv-shows/top-tv-shows.component';
import { TopMoviesComponent } from './shared/components/top-movies/top-movies.component';

const routes: Routes = [
  { path: '', component: TopMoviesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tvShow', component: TvShowsComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'topTvShows', component: TopTvShowsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
