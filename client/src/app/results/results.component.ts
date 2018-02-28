import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  query: any;
  resultsList: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.resultsList = this._httpService.results;
  }

}
