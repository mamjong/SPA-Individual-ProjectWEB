import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models/user.model";
import {UserService} from "../shared/services/user.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observer} from "rxjs/Observer";
import {Subscriber} from "rxjs/Subscriber";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  private subscription: Subscription;
  private username: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.username = params['username'];
        }
      );

    this.subscription = this.userService.getRequest(this.username)
      .subscribe((user) => {
          this.user = new User(user.json()._id, user.json().name, user.json().DoB, user.json().bio);
          this.user.setDoBString();
        },
        (error) => {
          this.subscription.unsubscribe();
          console.log(error);
        },
        () => {
          this.subscription.unsubscribe();
        });
  }
}
