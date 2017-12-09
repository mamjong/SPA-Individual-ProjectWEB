import {Component, DoCheck, OnInit} from '@angular/core';
import {LoginService} from "../shared/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  private loggedIn: boolean;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loggedIn = this.loginService.getLoggedIn();
  }

  ngDoCheck() {
    this.loggedIn = this.loginService.getLoggedIn();
  }

}
