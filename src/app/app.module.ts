import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './index/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatListModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import 'hammerjs';
import { LoginComponent } from './index/login/login.component';
import { MovieComponent } from './shared/components/movie/movie.component';
import { TvShowsComponent } from './shared/components/tv-shows/tv-shows.component';
import { RatingComponent } from './shared/components/rating/rating.component';
import { MovieService } from './shared/services/movie.service';
import { ToastrService } from './shared/services/toastr.service';
import { UserService } from './shared/services/user.service';
import { ApiConfigService } from './shared/services/api-config.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopTvShowsComponent } from './shared/components/top-tv-shows/top-tv-shows.component';
import { TopMoviesComponent } from './shared/components/top-movies/top-movies.component';
import { SearchPipe } from './search.pipe';
import { AuthGuard } from './shared/services/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MovieComponent,
    TvShowsComponent,
    RatingComponent,
    TopTvShowsComponent,
    TopMoviesComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MovieService, UserService, ToastrService, ApiConfigService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
