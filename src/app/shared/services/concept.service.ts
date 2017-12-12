import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {IService} from "../IService";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment";

@Injectable()
export class ConceptService implements IService{
  apiCollectionUrl = environment.serverUrl + '/concepts';
  apiEntityUrl = environment.serverUrl + '/concept/';
  concepts = [];

  constructor(private http: Http) {
  }

  getRequest(): Observable<any> {
    return this.http.get(this.apiCollectionUrl);
  }

  postRequest(): Observable<any> {
    return
  }

  putRequest(): Observable<any> {
    return
  }

  deleteRequest(): Observable<any> {
    return
  }
}
