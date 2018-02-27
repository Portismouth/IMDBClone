import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _httpService: HttpService) { }

  movieList = [];

  ngOnInit() {
    this.searchResultsFromService("fight club");
    this.currentWeekReleaseFromService();
    this.alreadyOutFromService();
  }

  searchResultsFromService(query, type?) {
    if (query.includes(" ")) {
      query = encodeURIComponent(query.trim())
    }
    if (type == "name"){
      type = "person";
    } else if (type == "title"){
      type = "movie"
    } else {
      type = "multi";
    }
    let result = this._httpService.search(query, type)
    result.subscribe(res => {
      console.log(res);
    });
  }

  currentWeekReleaseFromService(){
    let thisWeek = this._httpService.currentWeekReleases()
    thisWeek.subscribe(res => {
      console.log(res);
    })
  }

  alreadyOutFromService(){
    let current = this._httpService.popularReleased();
    current.subscribe(res => {
      console.log(res);
      console.log(res["results"]);
      for(let x in res["results"]){
        this.movieList.push(res["results"][x]["title"])
      }
      console.log(this.movieList)
      // let movies = res['results'];
      // movies.sort(function (a, b) {
      //   return b.vote_average - a.vote_average
      // })
      // console.log(movies);
    })
  }


}
