import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MovieService } from '../movie.service';
import { LocalService } from '../local.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Movie } from '../movie-class';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(
    private _movieService: MovieService
  ) { }

  movie = new Movie();
  stars; 

  ngOnInit() {
    this.getMovieFromService();
  }

  getMovieFromService(){
    let movReq = this._movieService.getMovieById();
    movReq.subscribe(res => {
      this.movie['movieId'] = res['id'];
      this.movie['title'] = res['title'];
      this.movie['overview'] = res['overview'];
      this.movie['poster_path'] = res['poster_path'];
      this.movie['runtime'] = res['runtime'];
      this.movie['release_date'] = res['release_date'];
      this.movie['stars'] = this._movieService.getMovieCast(res['id']);
      console.log(this.movie['stars']);
    });
  }

  getStarsFromService(){
    this.stars = this._movieService.getMovieCast(550);
  }
}
