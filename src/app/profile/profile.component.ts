import {AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {User} from "../shared/user.model";
import {LoginService} from "../shared/login.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user: User;

  constructor(private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
    this.loginService.userChanged
      .subscribe((user) => {
        this.user = user;
      });
  }

  onEditProfile() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteProfile() {
    this.loginService.deleteUser(this.user.username)
      .then(() => {
        this.loginService.setLoggedIn(false);
        this.router.navigate(['/concepts']);
      })
  }
}
