import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {UserState} from "../../shared/user.state";
import {User} from "../../shared/models/user.model";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-related',
  templateUrl: './profile-related.component.html',
  styleUrls: ['./profile-related.component.css']
})
export class ProfileRelatedComponent implements OnInit {
  state: string;
  users: string[];
  private user: User;
  private subscription: Subscription;


  constructor(private userService: UserService,
              private userState: UserState,
              private router: Router) { }

  ngOnInit() {
    this.users = [];
    this.state = 'stateless';

    this.userState.userChanged
      .subscribe((user) => {
        this.user = user;
        this.getRelated(this.user.username);
      });
    this.user = this.userState.getUser();

    this.getRelated(this.user.username);
  }

  onUserClick(index: number) {
    this.router.navigate(['/user/' + this.users[index]]);
  }

  getRelated(username: string) {
    this.state = 'loading';

    this.subscription = this.userService.getRelated(this.user.username)
      .subscribe(
        (response) => {
          console.log(response.json());
          response.json().records.forEach((user) => {
            if (user._fields[0].properties.username !== this.user.username) {
              this.users.push(user._fields[0].properties.username);
            }
          });
        },
        (error) => {
          console.log(error);
          this.subscription.unsubscribe();
          this.state = 'failed';
        },
        () => {
          this.state = 'stateless';
        }
      )
  }

}
