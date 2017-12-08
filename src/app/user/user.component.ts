import { Component, OnInit } from '@angular/core';
import {User} from "../shared/user.model";
import {UserService} from "./user.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  subscription: Subscription;
  username: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.username = params['username'];
          this.userService.getUser(this.username);
          this.user = this.userService.returnUser();
        }
      );

    this.subscription = this.userService.userChanged
      .subscribe((user) => {
        this.user = user;
      });
  }

}
