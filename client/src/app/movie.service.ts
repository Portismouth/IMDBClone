import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie-class';

@Injectable()
export class MovieService {

  constructor(private _movie: HttpClient) { }

  apiKey = '96cb0a91c72f14a27b23bdca3fff49ea';
  cast = [];

  getMovieById() {
    return this._movie.get('https://api.themoviedb.org/3/movie/550?api_key=96cb0a91c72f14a27b23bdca3fff49ea&language=en-US');
  }

  getMovieCast(movieId){
    let topCast = this._movie.get('https://api.themoviedb.org/3/movie/550/credits?api_key=96cb0a91c72f14a27b23bdca3fff49ea');
    topCast.subscribe(res => {
      for(var i = 0; i < 3; i++){
        this.cast.push(res['cast'][i]);
      }
      console.log(this.cast)
      return this.cast;
    })
  }
}
