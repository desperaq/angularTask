import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-top-tv-shows',
  templateUrl: './top-tv-shows.component.html',
  styleUrls: ['./top-tv-shows.component.scss']
})
export class TopTvShowsComponent implements OnInit {

    // all tv shows from database
  public allTvShows: any = [];
    // top 10 tv shows from database sorted by rating
  public topTvShow: any = [];
  // user variable
  public user: any;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getTopTvShows();
    this.user = JSON.parse(localStorage.getItem('user')) || {};
  }

  // -------------------------------------
  // --- get top tv shows function ---
  // rating number is fixed on two decimal
  // tv shows are sorted by rating
  // -------------------------------------

  getTopTvShows() {
    this.movieService.getMovies().subscribe(data=> {

      for(let dat of data['data']) {

       dat['rating'] = Number(dat['rating']).toFixed(2);

        if(dat['isMovie']===false){
          this.allTvShows.push(dat);
        }
        this.allTvShows.sort(function (a,b) {
          return b.rating-a.rating
        });
      }

      for(let element of this.allTvShows) {
        this.topTvShow.push(element);
        if(this.topTvShow.length == 10){
          break;
        }
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
