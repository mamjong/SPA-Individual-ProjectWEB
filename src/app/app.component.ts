import { Component } from '@angular/core';
import {User} from "./shared/user.model";
import {LoginService} from "./shared/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ LoginService ]
})
export class AppComponent {
  private title = 'app';
  private loadedFeature = 'concepts';
  private user: User;

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  handleUserLoggedIn(user: User) {
    this.user = user;
    console.log('It worked: ' + user);
  }
}
