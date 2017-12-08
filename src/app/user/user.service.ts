import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment.prod";
import {User} from "../shared/user.model";
import {Http, Headers} from "@angular/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {
  private apiUrl = environment.serverUrl + '/user/';
  private user: User;

  public userChanged = new Subject<User>();

  constructor(private http: Http) {
  }

  getUser(username: string) {
    this.http.get(this.apiUrl + username)
      .toPromise()
      .then((user) => {
        this.populateUser(user.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  populateUser(user: User) {
    this.user = user;
    this.userChanged.next(this.user);
  }

  returnUser() {
    return this.user;
  }
}
