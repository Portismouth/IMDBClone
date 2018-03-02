import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MovieService } from '../movie.service';
import { LocalService } from '../local.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor(
    private _movieService: MovieService,
    private _localService: LocalService,
    private _authService: AuthService,
    private _route: ActivatedRoute
  ) { }

  movieId;
  reviewForm;
  authError: Boolean;

  ngOnInit() {
    this.movieId = this._route.params["_value"].movieId
    this.reviewForm = { title: "", text: "", rating: null, movieId: this.movieId };
    console.log(this.reviewForm)
  }

  submitReview() {
    let authorize = this._authService.checkSession();
    authorize.subscribe(res => {
      if (res['status'] == true) {
        let add = this._localService.submitReviewToDb(res['userId'], this.reviewForm);
        add.subscribe(res => {
          console.log(res);
        })
      } else {
        this.authError = true;
      }
    })
    // let submit = this._localService.submitReviewToDb('5a987794e2dc2d04a4ee1261', this.reviewForm);
    // submit.subscribe(res => {
    //   console.log(res);
    // });
  }
}
