import {Component, OnInit} from '@angular/core';
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
  private user: User;
  private subscription: Subscription;

  constructor(private userState: UserState,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.userState.userChanged
      .subscribe((user) => {
        console.log('userChanged next was called!');
        this.user = user;
        console.log('new user: ' + this.user);
      });
    this.user = this.userState.getUser();
  }

  onEditProfile() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProfile() {

    this.subscription = this.userService.deleteRequest(this.user.username)
      .subscribe(
        () => {
          this.userState.setLoggedIn(false);
          this.router.navigate(['/concepts']);
        },
        (error) => {
          console.log(error);
          this.subscription.unsubscribe();
        },
        () => {
          this.subscription.unsubscribe();
        }
      )
  }
}
