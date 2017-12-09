import {Subject} from "rxjs/Subject";

export interface IObjectService {
  apiUrl: string;
  item: any;

  itemChanged: Subject<any>;

  getItem(routeParams: string);

  populateItem(item: any);
}
