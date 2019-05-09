import { Component, OnInit, Output } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.scss']
})
export class TopMoviesComponent implements OnInit {

  // pagination variables
  startPage: Number;
  paginationLimit: Number;

  // list of all the elements from the table "movies"
  public list: any = [];
  // all movies from database
  public allMovies: any = [];
  // top 10 movies from database sorted by rating
  public topMovie: any = [];
  // user variable
  public user: any;

  constructor(private movieService: MovieService) {
    this.startPage = 0;
    this.paginationLimit = 10;
  }

  ngOnInit() {
    this.getTopMovies();
    this.user = JSON.parse(localStorage.getItem('user')) || {};
  }

  // -------------------------------------
  // --- get top movies function ---
  // rating number is fixed on two decimal
  // movies are sorted by rating
  // -------------------------------------

  getTopMovies() {
    this.movieService.getMovies().subscribe(data => {
      for (let dat of data['data']) {
        dat['rating'] = Number(dat['rating']).toFixed(2);
        this.list.push(dat);
        if (dat['isMovie'] === true) {
          this.allMovies.push(dat);
        }
        this.allMovies.sort(function (a, b) {
          return b.rating - a.rating
        });
      }

      for (let element of this.allMovies) {
        this.topMovie.push(element);
        if (this.topMovie.length == 10) {
          break;
        }
      }
    });
  }

  // ---------------------------
  // show 10 more items on click
  // ---------------------------

  showMoreItems() {
    this.paginationLimit = Number(this.paginationLimit) + 10;
  }

  // --------------
  // rating process
  // --------------

  ratingClicked: number;
  itemIdRatingClicked: string;
  ratingComponentClick(clickObj: any): void {
    let rate = {
      user_id: this.user.id,
      movie_id: clickObj.itemId,
      rating: clickObj.rating
    }

    this.movieService.rateIt(rate).subscribe(res => {
      console.log(res);
    }
    );
  }


}
