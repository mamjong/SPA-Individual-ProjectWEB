import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment.prod";
import {Http} from "@angular/http";
import {User} from "./user.model";

@Injectable()
export class LoginService{
  private apiUrl = environment.serverUrl + '/user/';
  private loggedIn: boolean;
  private user: User;

  constructor(private http: Http) {
  }

  login(routeParams: string): Promise<any> {
    return this.http.get(this.apiUrl + routeParams)
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
    this.user = user;
  }
}
