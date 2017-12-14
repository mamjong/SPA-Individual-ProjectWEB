import {Observable} from "rxjs/Observable";

export interface IService {
  apiEntityUrl: string;
  apiCollectionUrl: string;

  getRequest(routeParams: string): Observable<any>;

  postRequest(object: any): Observable<any>;

  putRequest(routeParams: string, object: any): Observable<any>;

  deleteRequest(routeParams: string): Observable<any>;
}

