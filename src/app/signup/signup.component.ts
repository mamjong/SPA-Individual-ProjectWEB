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
  private signupForm: FormGroup;
  private username: string;
  private usernameTaken: boolean;
  private minDate: Date;
  private minDateYear: number;
  private subscription: Subscription;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private userState: UserState) {
  }

  ngOnInit() {
    this.minDate = new Date();
    this.minDateYear = this.minDate.getFullYear() - 100;
    this.minDate.setFullYear(this.minDateYear, 1, 1);
    this.initForm();
  }

  private onSubmit() {
    if (this.signupForm.valid) {
      this.subscription = this.userService.postRequest(this.signupForm.value)
        .subscribe(
          (response) => {
            if (response.json().mongoDB) {
              console.log('mongoDB response');
              const user = new User(response.json().mongoDB._id, response.json().mongoDB.name,
                response.json().mongoDB.DoB, response.json().mongoDB.bio);
              this.userState.setUser(user);
              this.userState.setLoggedIn(true);
              this.onCancel();
            } else {
              console.log('Neo4J response');
              console.log(response);
            }
          },
          (error) => {
            console.log('username taken');
            this.usernameTaken = true;
            console.log(error);
            this.subscription.unsubscribe();
          },
          () => {
            console.log('signup complete and unsubbed');
            this.subscription.unsubscribe();
          }
        )
    }
  }

  private onCancel() {
    this.router.navigate(['/concepts']);
  }

  private onUsernameChange() {
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
