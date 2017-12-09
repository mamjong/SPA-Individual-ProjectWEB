import { Component, OnInit } from '@angular/core';
import {User} from "../shared/user.model";
import {LoginService} from "../shared/login.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user: User;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
  }

}
