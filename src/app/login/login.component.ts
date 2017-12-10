import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {LoginService} from "../shared/login.service";
import {Router} from "@angular/router";
import {User} from "../shared/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') private form: NgForm;
  private formValue;
  private user: User;
  private username: string;
  private loginFailed: boolean;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginFailed = false;
  }

  onLogin(form: NgForm) {
    this.formValue = form.value;
    this.username = this.formValue.username;

    this.loginService.login(this.username)
      .then((user) => {
        this.user = new User(user.json()._id, user.json().name, user.json().DoB, user.json().bio);
        this.user.setDoBString();
        this.loginService.setUser(this.user);
        this.loginService.setLoggedIn(true);
        this.router.navigateByUrl('/concepts');
      })
      .catch((error) => {
        console.log(error);
        this.loginFailed = true;
      })
  }
}
