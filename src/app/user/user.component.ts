import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models/user.model";
import {UserService} from "../shared/services/user.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observer} from "rxjs/Observer";
import {Subscriber} from "rxjs/Subscriber";
import {ConceptsState} from "../shared/concepts.state";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  private subscription: Subscription;
  private username: string;
  private state: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.state = 'loading';

    this.route.params
      .subscribe(
        (params: Params) => {
          this.username = params['username'];
          this.getUser(this.username);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getUser(username: string) {
    this.subscription = this.userService.getRequest(username)
      .subscribe((user) => {
          this.user = new User(user.json()._id, user.json().name, user.json().DoB, user.json().bio);
          this.user.setDoBString();
          this.state = 'success';
        },
        (error) => {
          this.subscription.unsubscribe();
          if (error.status === 404) {
            this.state = 'notFound'
          } else {
            this.state = 'failure';
          }
          console.log(error);
        },
        () => {
          this.subscription.unsubscribe();
        });
  }
}
