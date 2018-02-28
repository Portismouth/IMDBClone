import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  searchForm: any;

  @Output() aTaskEventEmitter = new EventEmitter();

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.searchForm = { query: "", type: "All" };
  }

  searchResultsFromService(query, type?) {
    if (query.includes(" ")) {
      query = encodeURIComponent(query.trim())
    }
    if (type == "name") {
      type = "person";
    } else if (type == "title") {
      type = "movie",
        type = "tv"
    } else {
      type = "multi";
    }
    let result = this._httpService.search(query, type);
    //this.aTaskEventEmitter.emit(result);
  }

  searchSubmit() {
    this.searchResultsFromService(this.searchForm.query, this.searchForm.type);
  }

}
