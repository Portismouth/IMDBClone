import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.searchResultsFromService("fight club");
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

}
