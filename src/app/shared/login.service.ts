import {Injectable, OnInit} from "@angular/core";
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";
import {User} from "./user.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class LoginService {
  private apiUrl = environment.serverUrl + '/user/';
  private loggedIn: boolean;
  private user: User;
  public userChanged = new Subject<User>();

  constructor(private http: Http) {
  }

  login(routeParams: string): Promise<any> {
    return this.http.get(this.apiUrl + routeParams)
      .toPromise();
  }

  updateUser(routeParams: string, newUser: User): Promise<any> {
    return this.http.put(this.apiUrl + routeParams, newUser)
      .toPromise();
  }

  deleteUser(routeParams: string): Promise<any> {
    return this.http.delete(this.apiUrl + routeParams)
      .toPromise();
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
