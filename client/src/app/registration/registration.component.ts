import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Params, Router, Route } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  registerForm = {
    email: "",
    name: "",
    password: "",
    passwordConf: ""
  }
  loginForm = {
    email: "",
    password: ""
  }
  displayErr: Boolean;
  regErrors = [];
  logErrors = [];
  userId;
  user;

  ngOnInit() {
    this.registerForm;
  }

  registerNewUser() {
    let registration = this._auth.sendNewUser(this.registerForm);
    registration.subscribe(res => {
      if (res["message"] != "success") {
        for (let error in res) {
          this.regErrors.push(res[error].message);
          this.displayErr = true;
        };
      } else {
        this.user = res["user"];
        this._router.navigate(['/user']);
      }
    });
  }

  loginUser() {
    let login = this._auth.loginUser(this.loginForm);
    login.subscribe(res => {
      if (res["message"] != "success") {
        console.log(res)
        for (let error in res) {
          this.logErrors.push(res[error].message);
          this.displayErr = true;
        };
      } else {
        this.user = res["user"];
        this._router.navigate(['/user']);
      }
      console.log(this.user)
    });
  }
}
