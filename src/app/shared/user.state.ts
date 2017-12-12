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

  // getRequest(routeParams: string): Observable<any> {
  //   return this.http.get(this.apiEntityUrl + routeParams);
  // }

  // login(routeParams: string): Promise<any> {
  //   return this.http.get(this.apiEntityUrl + routeParams)
  //     .toPromise();
  // }
  //
  // signUp(object: User): Observable<any> {
  //
  //   return Observable.create((observer: Observer<any>) => {
  //     this.http.post(this.apiCollectionUrl, object)
  //       .toPromise()
  //       .then((response) => {
  //         observer.next(response);
  //         return this.http.post(this.apiEntityUrl + response.json().mongoDB._id, {})
  //       })
  //       .then((response) => {
  //         observer.next(response);
  //         observer.complete();
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //       })
  //   });
  // }


  // updateUser(routeParams: string, newUser: User): Promise<any> {
  //   return this.http.put(this.apiEntityUrl + routeParams, newUser)
  //     .toPromise();
  // }
  //
  // updateUserConnection(routeParams: string): Promise<any> {
  //   return this.http.put(this.apiEntityUrl + routeParams + '/connect', {})
  //     .toPromise();
  // }

  // deleteUser(routeParams: string): Promise<any> {
  //   return this.http.delete(this.apiEntityUrl + routeParams)
  //     .toPromise();
  // }

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
    console.log(this.user);
    this.userChanged.next(this.user);
  }
}
