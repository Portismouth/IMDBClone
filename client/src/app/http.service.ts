import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  apiKey = '96cb0a91c72f14a27b23bdca3fff49ea'

  search(query, type) {
    console.log(query)
    return this._http.get('https://api.themoviedb.org/3/search/' + type + '?api_key=' + this.apiKey + '&language=en-US&query=' + query + '&page=1&include_adult=false&region=US')
  }

  moviesWithActor() {

  }

  currentWeekReleases() {
    //need to figure out way to get dates auto
    return this._http.get('https://api.themoviedb.org/3/discover/movie?api_key=96cb0a91c72f14a27b23bdca3fff49ea&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2018-02-25&primary_release_date.lte=2018-03-04')
  }

  popularReleased() {
    //find better source pulls netflix releases...
    return this._http.get('https://api.themoviedb.org/3/discover/movie?api_key=96cb0a91c72f14a27b23bdca3fff49ea&language=en-US&region=US&include_adult=false&include_video=false&page=1&primary_release_date.gte=2018-01-24&primary_release_date.lte=2018-02-26&vote_count.gte=100')
  }
}
