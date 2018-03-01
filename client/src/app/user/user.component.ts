import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LocalService } from '../local.service';
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
    private _router: Router
  ) { }

  user = new User();
  reviewForm: { title: "Fight Club Rules", text: "Great Movie, Great Movie, Great Movie, Great Movie", rating: 10, movieId: 550 }

  ngOnInit() {

    this.reviewForm = { title: "Fight Club Rules", text: "Great Movie, Great Movie, Great Movie, Great Movie", rating: 10, movieId: 550 }
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
            this.user.reviews.push(user["reviews"][review]);
          }
          for(let item in user['watchlist']){
            this.user.watchlist.push(user['watchlist'][item]);
          }
          console.log(this.user);
        })
      } else {
        this._router.navigate(['/']);
      }
    });
  }

  submitReview(){
    let submit = this._local.submitReviewToDb('5a96200fb7bd8d2e34eeab3c', this.reviewForm);
    submit.subscribe(res => {
      console.log(res);
    })
  }

}
