import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie-class';

@Injectable()
export class MovieService {

  constructor(private _movie: HttpClient) { }

  apiKey = '96cb0a91c72f14a27b23bdca3fff49ea';
  cast = [];

  getMovieById(movieId) {
    return this._movie.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + this.apiKey + '&language=en-US');
  }

  getMovieCredits(movieId) {
    return this._movie.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=' + this.apiKey);
  }

  getCertification(movieId) {
    return this._movie.get('https://api.themoviedb.org/3/movie/' + movieId + '/release_dates?api_key=' + this.apiKey);
  }

  getRecommendations(movieId) {
    return this._movie.get('https://api.themoviedb.org/3/movie/' + movieId + '/recommendations?api_key=' + this.apiKey + '&language=en-US&page=1')
  }
}
