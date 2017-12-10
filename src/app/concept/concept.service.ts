import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Concept} from "./concept.model";
import {Http, Headers} from "@angular/http";
import {Subject} from "rxjs/Subject";
import {IListService} from "../shared/IListService";

@Injectable()
export class ConceptService implements IListService {
  apiUrl = environment.serverUrl + '/concepts';
  items: Concept[] = [];

  public itemsChanged = new Subject<Concept[]>();

  constructor(private http: Http) {
  }

  getItems() {
    this.http.get(this.apiUrl)
      .toPromise()
      .then((concepts) => {
        console.log(concepts.json());
        this.populateItems(concepts.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  populateItems(concepts: Concept[]) {
    this.items = concepts;
    this.itemsChanged.next(this.items.slice());
  }

  getItem(index: number) {
    return this.items[index];
  }

}
