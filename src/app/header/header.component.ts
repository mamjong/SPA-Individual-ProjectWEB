import {Component, DoCheck, OnInit} from '@angular/core';
import {UserState} from "../shared/user.state";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  loggedIn: boolean;

  constructor(private userState: UserState) { }

  ngOnInit() {
    this.userState.setLoggedIn(false);
  }

  ngDoCheck() {
    this.loggedIn = this.userState.getLoggedIn();
  }

}
