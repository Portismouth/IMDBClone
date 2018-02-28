import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LocalService } from '../local.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _local: LocalService
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
          this.user.id = user["_id"];
          this.user.name = user["name"];
          this.user.desc = user["desc"];
          for (let review in user["reviews"]) {
            this.user.reviews.push(user["reviews"][review]);
          }
          console.log(this.user);
        })
      }
    });
  }

  submitReview(){
    let submit = this._local.submitReviewToDb('5a95f6c29c1ee01fe0592741', this.reviewForm);
    submit.subscribe(res => {
      console.log(res);
    })
  }

}
