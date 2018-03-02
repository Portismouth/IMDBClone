import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReviewService {

  constructor(private _reviews: HttpClient) { }

  apiKey = '96cb0a91c72f14a27b23bdca3fff49ea';

  getReviews(movieId) {
    return this._reviews.get('https://api.themoviedb.org/3/movie/' + movieId + '/reviews?api_key=' + this.apiKey + '&language=en-US&page=1')
  }
}
