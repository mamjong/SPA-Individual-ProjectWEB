import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";
import {User} from "../shared/models/user.model";
import {UserState} from "../shared/user.state";
import {Subscription} from "rxjs/Subscription";

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
  private subscription: Subscription;

  constructor(private userService: UserService,
              private userState: UserState,
              private router: Router) {
  }

  ngOnInit() {
    this.loginFailed = false;
  }

  onLogin(form: NgForm) {
    this.formValue = form.value;
    this.username = this.formValue.username;

    this.subscription = this.userService.getRequest(this.username)
      .subscribe(
        (response) => {
          this.user = new User(response.json()._id, response.json().name, response.json().DoB, response.json().bio);
          this.user.setDoBString();
          this.userState.setUser(this.user);
          this.userState.setLoggedIn(true);
          this.router.navigateByUrl('/concepts');
        },
        (error) => {
          console.log(error);
          this.loginFailed = true;
          this.subscription.unsubscribe();
        },
        () => {
          this.subscription.unsubscribe();
        }
      )
  }
}
