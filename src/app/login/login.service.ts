import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment.prod";
import {Http, Headers} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {User} from "../shared/user.model";
import {IObjectService} from "../shared/IObjectService";

@Injectable()
export class LoginService implements IObjectService{
  apiUrl = environment.serverUrl + '/user/';
  item: User;

  public itemChanged = new Subject<User>();

  constructor(private http: Http) {
  }

  getItem(routeParams: string) {
    this.http.get(this.apiUrl + routeParams)
      .toPromise()
      .then((user) => {
        this.populateItem(user.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  populateItem(user: User) {
    this.item = user;
    this.itemChanged.next(this.item);
  }
}
