import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {dateLimitValidator} from "../shared/validators/date-limit.validator";
import {UserService} from "../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserState} from "../shared/user.state";
import {User} from "../shared/models/user.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  username: string;
  usernameTaken: boolean;
  private minDate: Date;
  private minDateYear: number;
  private subscription: Subscription;
  private state: string;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private userState: UserState) {
  }

  ngOnInit() {
    this.state = 'stateless';
    this.minDate = new Date();
    this.minDateYear = this.minDate.getFullYear() - 100;
    this.minDate.setFullYear(this.minDateYear, 1, 1);
    this.initForm();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.state = 'loading';
      this.subscription = this.userService.postRequest(this.signupForm.value)
        .subscribe(
          (response) => {
            if (response.json().mongoDB) {
              const user = new User(response.json().mongoDB._id, response.json().mongoDB.name,
                response.json().mongoDB.DoB, response.json().mongoDB.bio);
              this.userState.setUser(user);
              this.userState.setLoggedIn(true);
              this.onCancel();
            } else {
              console.log(response);
            }
          },
          (error) => {
            if (error.status === 422) {
              this.usernameTaken = true;
              this.state = 'stateless';
            } else {
              this.state = 'failure';
            }
            console.log(error);
            this.subscription.unsubscribe();
          },
          () => {
            this.subscription.unsubscribe();
          }
        )
    }
  }

  onCancel() {
    this.router.navigate(['/concepts']);
  }

  onUsernameChange() {
    this.usernameTaken = false;
  }

  private initForm() {
    let username = '';
    let userName = '';
    let userDoB = new Date();
    userDoB.setFullYear(1999, 0, 1);
    let userBio = '';

    this.signupForm = new FormGroup({
      'username': new FormControl(username, Validators.required),
      'name': new FormControl(userName),
      'DoB': new FormControl(userDoB, dateLimitValidator(this.minDate)),
      'bio': new FormControl(userBio)
    });
  }
}
