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
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  movieId;
  movieTitle;
  reviewForm = { reviewTitle: "", text: "", rating: null, movieId: "", movieTitle: "" }
  authError: Boolean;
  submitError: Boolean;
  revErrors= [];

  ngOnInit() {
    this.movieId = this._route.params["_value"].movieId;
    this.getMovieTitleFromService();
    console.log(this.reviewForm)
  }

  submitReview() {
    let authorize = this._authService.checkSession();
    authorize.subscribe(res => {
      if (res['status'] == true) {
        let add = this._localService.submitReviewToDb(res['userId'], this.reviewForm);
        add.subscribe(res => {
          if (res["message"] != "success") {
            console.log(res)
            for (let error in res) {
              this.revErrors.push(res[error].message);
              this.submitError = true;
            };
          } else {
            this._router.navigate(['/title/', this.movieId])
          }
        })
      } else {
        this.authError = true;
      }
    })
  }

  getMovieTitleFromService(){
    let title = this._movieService.getMovieById(this.movieId);
    title.subscribe(res => {
      this.reviewForm = { reviewTitle: "", text: "", rating: null, movieId: this.movieId, movieTitle: res['title'] };
    });
  }
  
}
