import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LocalService } from '../local.service';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _local: LocalService,
    private _movie: MovieService,
    private _router: Router
  ) { }

  user = new User();
  userReviews = [];

  ngOnInit() {
    let session = this._auth.checkSession();
    session.subscribe(res => {
      console.log(res);
      if (res['status'] == true) {
        let user = this._local.getUser(res['userId']);
        user.subscribe(user => {
          console.log(user);
          this.user.id = user["_id"];
          this.user.name = user["name"];
          this.user.desc = user["desc"];
          this.user.memberSince = user['createdAt'];
          for (let review in user["reviews"]) {
            // this.user.reviews.push(user["reviews"][review]);
            this.getReviewsFromService(user["reviews"][review]);
          }
          for (let item in user['watchlist']) {
            this.user.watchlist.push(user['watchlist'][item]);
          }
        })
      } else {
        this._router.navigate(['/']);
      }
    });
  }

  getReviewsFromService(reviewId) {
    let revReq = this._local.getReview(reviewId);
    revReq.subscribe(res => {
      this.userReviews.push(res);
    });
  }
}