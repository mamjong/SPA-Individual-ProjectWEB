import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {IService} from "../IService";
import {Observable} from "rxjs/Observable";
import {environment} from "../../../environments/environment.prod";
import {Concept} from "../models/concept.model";

@Injectable()
export class ConceptService implements IService {
  apiCollectionUrl = environment.serverUrl + '/concepts';
  apiEntityUrl = environment.serverUrl + '/concept/';

  constructor(private http: Http) {
  }

  getRequest(): Observable<any> {
    return this.http.get(this.apiCollectionUrl);
  }

  postRequest(object: Concept): Observable<any> {
    return this.http.post(this.apiCollectionUrl, object);
  }

  putRequest(routeParams: string, object: Concept): Observable<any> {
    return this.http.put(this.apiEntityUrl + routeParams, object);
  }

  deleteRequest(routeParams: string): Observable<any> {
    return this.http.delete(this.apiEntityUrl + routeParams);
  }
}
