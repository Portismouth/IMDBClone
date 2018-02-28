import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocalService {

  constructor(private _http: HttpClient) { }

  getUser(userId) {
    return this._http.get('/user/' + userId)
  }

  submitReviewToDb(userId, review){
    console.log(userId, review);
    return this._http.post('/user/' + userId, review);
  }

}
