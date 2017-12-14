import {Component, OnInit, Output} from '@angular/core';
import {User} from "../shared/models/user.model";
import {UserState} from "../shared/user.state";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  private subscription: Subscription;
  state;

  constructor(private userState: UserState,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.state = 'stateless';
    this.userState.userChanged
      .subscribe((user) => {
        this.user = user;
      });
    this.user = this.userState.getUser();
  }

  onEditProfile() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProfile() {
    this.state = 'loading';

    this.subscription = this.userService.deleteRequest(this.user.username)
      .subscribe(
        () => {
          this.userState.setLoggedIn(false);
          this.router.navigate(['/concepts']);
        },
        (error) => {
          console.log(error);
          this.state = 'failure';

          setTimeout(() => {
            this.state = 'stateless'
          }, 3000);

          this.subscription.unsubscribe();
        },
        () => {
          this.subscription.unsubscribe();
        }
      )
  }
}
