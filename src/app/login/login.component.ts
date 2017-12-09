import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {User} from "../shared/user.model";
import {LoginService} from "./login.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') private form: NgForm;
  private formValue;
  private username: string;
  private user: User;
  private subscription: Subscription;
  private loginFailed: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.subscription = this.loginService.itemChanged
      .subscribe((user) => {
        this.user = user;
      });

    this.loginFailed = false;
  }

  onLogin(form: NgForm) {
    this.formValue = form.value;
    this.username = this.formValue.username;

    this.loginService.getItem(this.username);

    console.log(this.user);

    if (this.user === undefined) {
      this.loginFailed = true;
    } else {

    }
  }
}
