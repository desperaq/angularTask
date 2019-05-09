import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})

export class TvShowsComponent implements OnInit {
  // All tv shows in database
  public allTvShows: any = [];
  // User variable
  public user: any;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getAllTvShows();
    this.user = JSON.parse(localStorage.getItem('user')) || {};
    console.log(this.user);
  }

  // -------------------------------------
  // -- get all tv shows function --
  // rating number is fixed on two decimal
  // tv shows are sorted by rating
  // -------------------------------------

  getAllTvShows() {
    this.movieService.getMovies().subscribe(data => {
      for (let dat of data['data']) {
        dat['rating'] = Number(dat['rating']).toFixed(2);
        console.log(dat['rating']);
        if (dat['isMovie'] === false) {
          this.allTvShows.push(dat);
        }
        this.allTvShows.sort(function (a, b) {
          return b.rating - a.rating
        });
      }
    })
  }

  // ------------------
  // rating process
  // ------------------

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
