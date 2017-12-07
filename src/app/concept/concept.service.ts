import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Concept} from "./concept.model";
import {Http, Headers} from "@angular/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ConceptService {
  private apiUrl = environment.serverUrl + '/concepts';
  private concepts: Concept[] = [];

  public conceptsChanged = new Subject<Concept[]>();

  constructor(private http: Http) {
  }

  getConcepts() {
    this.http.get(this.apiUrl)
      .toPromise()
      .then((concepts) => {
        console.log(concepts.json());
        this.populateConcepts(concepts.json());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  populateConcepts(concepts: Concept[]) {
    this.concepts = concepts;
    this.conceptsChanged.next(this.concepts.slice());
  }

}
