import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MovieService } from '../movie.service';
import { ReviewService } from '../review.service';
import { LocalService } from '../local.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SlicePipe } from '@angular/common';
import { Movie } from '../movie-class';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(
    private _movieService: MovieService,
    private _localService: LocalService,
    private _reviewService: ReviewService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  movie = new Movie();
  stars = [];
  fullCast = [];
  director;
  writers = [];
  certification = {};
  authError: Boolean;
  movieId;
  recommendations = [];
  reviews = [];
  user

  ngOnInit() {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.movieId = this._route.params["_value"].movieId;
    this.getMovieFromService();
    this.getStarsFromService();
    this.getDirectorFromService();
    this.getWritersFromService();
    this.getCertificationFromService();
    this.getFullCastFromService();
    this.getRecommendationsFromService();
    this.getReviewsFromMovieService();
    this.getReviewsFromLocalService();
  }

  getMovieFromService() {
    let movReq = this._movieService.getMovieById(this.movieId);
    movReq.subscribe(res => {
      this.movie['movieId'] = res['id'];
      this.movie['title'] = res['title'];
      this.movie['overview'] = res['overview'];
      this.movie['poster_path'] = res['poster_path'];
      this.movie['runtime'] = res['runtime'];
      this.movie['release_date'] = res['release_date'];
      this.movie['year'] = res['release_date'].substr(0, 4);
      this.movie['genres'] = res['genres'];
      this.movie['backdrop_path'] = res['backdrop_path'];
      this.movie['vote_average'] = res['vote_average'];
      this.movie['vote_count'] = res['vote_count'];
      console.log(this.movie);
    });
  }

  getStarsFromService() {
    let starReq = this._movieService.getMovieCredits(this.movieId);
    starReq.subscribe(res => {
      for (let i = 0; i < 3; i++) {
        this.stars.push(res['cast'][i]);
      }
    });
  }

  getDirectorFromService() {
    let dirReq = this._movieService.getMovieCredits(this.movieId);
    dirReq.subscribe(res => {
      for (let i = 0; i < res['crew'].length; i++) {
        if (res['crew'][i]['job'] == "Director") {
          this.director = res['crew'][i]['name']
        }
      }
    })
  }

  getWritersFromService() {
    let writerReq = this._movieService.getMovieCredits(this.movieId);
    writerReq.subscribe(res => {
      for (let i = 0; i < res['crew'].length; i++) {
        if (res['crew'][i]['department'] == "Writing") {
          this.writers.push({ id: res['crew'][i]['id'], name: res['crew'][i]['name'], job: res['crew'][i]['job'] });
        }
      }
    });
  }

  getCertificationFromService() {
    let certReq = this._movieService.getCertification(this.movieId);
    certReq.subscribe(res => {
      let result = res['results'].find(c => c.iso_3166_1 === "US");
      this.certification = result['release_dates'].find(cert => cert.iso_639_1 === "");
    })
  }

  getFullCastFromService() {
    let castReq = this._movieService.getMovieCredits(this.movieId);
    castReq.subscribe(res => {
      this.fullCast = res['cast'];
    });
  }

  getRecommendationsFromService() {
    let recReq = this._movieService.getRecommendations(this.movieId);
    recReq.subscribe(res => {
      console.log(res['results']);
      for (let i = 0; i < 5; i++) {
        this.recommendations.push(res['results'][i]);
      }
    });
  }

  addToWatchList() {
    let authorize = this._authService.checkSession();
    authorize.subscribe(res => {
      if (res['status'] == true) {
        let add = this._localService.addToWatchList("5a9848e6679aeb326c07cf9e", this.movie);
        add.subscribe(res => {
          console.log(res);
        })
      } else {
        this.authError = true;
      }
    })
  }

  getReviewsFromMovieService() {
    let req = this._reviewService.getReviews(this.movieId);
    req.subscribe(res => {
      for (let review in res['results']) {
        this.reviews.push(res['results'][review]);
      }
      console.log(this.reviews);
    });
  }

  getReviewsFromLocalService() {
    let req = this._localService.getAllReviews(this.movieId);
    req.subscribe(res => {
      for(let review in res){
        console.log(res[review])
        let user = this._localService.getUser(res[review]['_user']);
        user.subscribe(un => {
          let userRev = { author: un['name'], content: res[review]['text']}
          this.reviews.push(userRev);
        });
      }
      console.log(this.reviews)
    });
  }
}
