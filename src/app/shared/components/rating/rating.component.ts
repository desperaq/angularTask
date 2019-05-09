import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthGuard } from '../../services/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  // input rating and item id number
  // output rating click

  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authGuard: AuthGuard,
    private router: Router) { }

  // input name
  inputName: string;

  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }

  // ------------------------
  // --- onClick function ---
  // ------------------------

  onClick(rating: number): void {
    if (this.authGuard.isLoggedIn()) {
      this.rating = rating;
      this.ratingClick.emit({
        itemId: this.itemId,
        rating: rating
      });
    }
    else {
      this.router.navigate(['/login']);
    }
  }

}
