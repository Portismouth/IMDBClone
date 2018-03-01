import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {
  currentWeekReleases: any;
  popularReleased: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this._httpService.currentWeekReleases().subscribe(data => this.currentWeekReleases = data["results"]);
    this._httpService.popularReleased().subscribe(data => this.popularReleased = data["results"]);
  }

}
