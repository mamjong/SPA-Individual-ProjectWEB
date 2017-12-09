import {Component, OnInit} from '@angular/core';
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
  private user: User;
  private subscription: Subscription;
  private username: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.username = params['username'];
        }
      );

    this.subscription = this.userService.itemChanged
      .subscribe((user) => {
        this.user = user;
      });
    this.userService.getItem(this.username);
  }

}
