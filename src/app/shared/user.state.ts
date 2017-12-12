import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "./models/user.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserState {
  private loggedIn: boolean;
  private user: User;

  public userChanged = new Subject<User>();

  constructor(private http: Http) {
    this.userChanged = new Subject<User>();
  }

  getLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User) {
    this.user = new User(user.username, user.name, user.DoB, user.bio);
    this.user.setDoBString();
    this.userChanged.next(this.user);
  }
}
