import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocalService {

  constructor(private _http: HttpClient) { }

  sendNewUser(newUser) {
    return this._http.post('/register', newUser);
  }
  loginUser(loginReq) {
    return this._http.post('/login', loginReq);
  }
}
