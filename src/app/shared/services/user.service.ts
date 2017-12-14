import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {IService} from "../IService";
import {User} from "../models/user.model";
import {Observer} from "rxjs/Observer";

@Injectable()
export class UserService implements IService {
  apiEntityUrl = environment.serverUrl + '/user/';
  apiCollectionUrl = environment.serverUrl + '/users';

  constructor(private http: Http) {
  }

  getRequest(routeParams: string): Observable<any> {
    return this.http.get(this.apiEntityUrl + routeParams);
  }

  getRelated(routeParams: string): Observable<any> {
    return this.http.get(this.apiEntityUrl + routeParams + '/related');
  }

  postRequest(object: User): Observable<any> {

    return Observable.create((observer: Observer<any>) => {
      this.http.post(this.apiCollectionUrl, object)
        .toPromise()
        .then((response) => {
          observer.next(response);
          console.log(this.apiEntityUrl + response.json().mongoDB._id + '/connect');
          return this.http.post(this.apiEntityUrl + response.json().mongoDB._id + '/connect', {}).toPromise();
        })
        .then((response) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        })
    });
  }

  putRequest(routeParams: string, object: User): Observable<any> {

    return Observable.create((observer: Observer<any>) => {
      this.http.put(this.apiEntityUrl + routeParams, object)
        .toPromise()
        .then((response) => {
          observer.next(response);
          return this.http.put(this.apiEntityUrl + routeParams + '/connect', {}).toPromise();
        })
        .then((response) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteRequest(routeParams: string): Observable<any> {
    return this.http.delete(this.apiEntityUrl + routeParams);
  }
}
