import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import * as $ from 'jquery';

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

  ngAfterViewInit() {
    $(document).ready(function() {
      $('#search').keyup(function (e) {
        // ignore tab, enter, and arrow keys
        if (e.keyCode === 9 ||
          e.keyCode === 13 ||
          e.keyCode === 37 ||
          e.keyCode === 38 ||
          e.keyCode === 39 ||
          e.keyCode === 40)
          return;

        var query = $(this).val();
        var type = $('#searchFilter').val();
        var apiKey = '96cb0a91c72f14a27b23bdca3fff49ea';

        if (query === '') {
          $('#autocomplete').html('');
        }
        else {
          $.get('https://api.themoviedb.org/3/search/multi?api_key=' + apiKey + '&language=en-US&query=' + query + '&page=1&include_adult=false', data => {
            $('#autocomplete').html('');
            data['results'].forEach(result => {
              if (result['name'] !== undefined) {
                $('#autocomplete').append('<li>' + result['name'] + '</li>');
              }
            });
          });
        }
      });

      $("#autocomplete").on("click", "li", function () {
        var query = $(this).text();

        $("#autocomplete").html("");
        $("#search").val(query);
      });

      $("#autocomplete").on("click", "li", function () {
        $(this).parent().children().removeClass("active");
        $(this).addClass("active");
      });

      $("#search").keydown(function (e) {
        if ($("#autocomplete li.active").length === 0) {
          $("#autocomplete li").first().addClass("active");
        } else if (e.keyCode === 40) { // down arrow
          var $active = $("#autocomplete li.active");
          $active.removeClass("active")
          $active.next().addClass("active");
        } else if (e.keyCode === 38) { // up arrow
          var $active = $("#autocomplete li.active");
          $active.removeClass("active")
          $active.prev().addClass("active");
        } else if (e.keyCode === 13) { // enter
          e.preventDefault();

          var query = $("#autocomplete li.active").text();

          $("#autocomplete").html("");
          $("#search").val(query);
        }
      });
    });

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
