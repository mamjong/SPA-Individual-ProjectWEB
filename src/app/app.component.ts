import { Component } from '@angular/core';
import {User} from "./shared/models/user.model";
import {UserState} from "./shared/user.state";
import {UserService} from "./shared/services/user.service";
import {ConceptService} from "./shared/services/concept.service";
import {ConceptsState} from "./shared/concepts.state";
import {ConceptsGuard} from "./shared/route-guards/concepts.guard";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
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
