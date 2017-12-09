import {Subject} from "rxjs/Subject";

export interface IListService {
  apiUrl: string;
  items: any[];

  itemsChanged: Subject<any[]>;

  getItems(routeParams: string);

  populateItems(items: any[]);

  getItem(index: number);
}
