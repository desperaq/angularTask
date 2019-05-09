import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  // all movies from database
  public allMovies: any = [];
  // user variable
  public user: any;

  constructor(private movieService: MovieService) { }


  ngOnInit() {
    this.getMovies();
    this.user = JSON.parse(localStorage.getItem('user')) || {};

  }

  // -------------------------------------
  // --- get all the movies function ---
  // rating number is fixed on two decimal
  // movies are sorted by rating
  // -------------------------------------

  getMovies() {
    this.movieService.getMovies().subscribe(data => {
      for (let dat of data['data']) {
        dat['rating'] = Number(dat['rating']).toFixed(2);
        if (dat['isMovie'] === true) {
          this.allMovies.push(dat);
        }
        this.allMovies.sort(function (a, b) {
          return b.rating - a.rating
        });
      }
    });
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
    this.movieService.rateIt(rate).subscribe(data => console.log(data));
  }

}
