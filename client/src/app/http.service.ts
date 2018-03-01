import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  apiKey = '96cb0a91c72f14a27b23bdca3fff49ea'
  results = [];

  search(query, type) {
    let result = this._http.get('https://api.themoviedb.org/3/search/' + type + '?api_key=' + this.apiKey + '&language=en-US&query=' + query + '&page=1&include_adult=false&region=US')
    result.subscribe(res => {
      for (let result in res["results"]) {
        this.results.push(res["results"][result]);
      }
    });
    return this.results;
  }

  moviesWithActor() {

  }

  currentWeekReleases() {
    var start = new Date();
    var end = new Date();

    while (start.getDay()) {
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate() - 1);
    }
    end.setDate(end.getDate() + 7);

    var startYear = start.getFullYear();
    var startMonth = start.getMonth() < 10 ? '0' + (start.getMonth() + 1) : start.getMonth() + 1;
    var startDate = start.getDate() < 10 ? '0' + start.getDate() : start.getDate();

    var endYear = end.getFullYear();
    var endMonth = end.getMonth() < 10 ? '0' + (end.getMonth() + 1) : (end.getMonth() + 1);
    var endDate = end.getDate() < 10 ? '0' + end.getDate() : end.getDate();

    return this._http.get(`https://api.themoviedb.org/3/discover/movie?api_key=96cb0a91c72f14a27b23bdca3fff49ea&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${startYear}-${startMonth}-${startDate}&primary_release_date.lte=${endYear}-${endMonth}-${endDate}`);
  }

  popularReleased() {
    //find better source pulls netflix releases...
    var start = new Date();
    var end = new Date();

    start.setDate(start.getDate() - 30);

    var startYear = start.getFullYear();
    var startMonth = start.getMonth() < 10 ? '0' + (start.getMonth() + 1) : start.getMonth() + 1;
    var startDate = start.getDate() < 10 ? '0' + start.getDate() : start.getDate();

    var endYear = end.getFullYear();
    var endMonth = end.getMonth() < 10 ? '0' + (end.getMonth() + 1) : (end.getMonth() + 1);
    var endDate = end.getDate() < 10 ? '0' + end.getDate() : end.getDate();

    return this._http.get(`https://api.themoviedb.org/3/discover/movie?api_key=96cb0a91c72f14a27b23bdca3fff49ea&language=en-US&region=US&include_adult=false&include_video=false&page=1&primary_release_date.gte=${startYear}-${startMonth}-${startDate}&primary_release_date.lte=${endYear}-${endMonth}-${endDate}&vote_count.gte=50`);
  }

  getMovieById(){
    return this._http.get('https://api.themoviedb.org/3/movie/550?api_key=96cb0a91c72f14a27b23bdca3fff49ea&language=en-US');
  }
}
