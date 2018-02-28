import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  resultsList: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    console.log(this._httpService.results);
    this.resultsList = this._httpService.results;
  }

}
