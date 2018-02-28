import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ResultsComponent } from './results/results.component';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _httpService: HttpService) { }
  movieList = [];

  ngOnInit() {
    this.currentWeekReleaseFromService();
    this.alreadyOutFromService();
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
      console.log(this.movieList);
      // let movies = res['results'];
      // movies.sort(function (a, b) {
      //   return b.vote_average - a.vote_average
      // })
      // console.log(movies);
    })
  }


}
