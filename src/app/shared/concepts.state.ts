import {Concept} from "./models/concept.model";
import {Subject} from "rxjs/Subject";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ConceptsState {
  private concepts: Concept[];

  public conceptsChanged;

  constructor(private http: Http) {
    this.concepts = [];
    this.conceptsChanged = new Subject<Concept[]>();
  }

  getConcept(index: number): Concept {
    return this.concepts[index];
  }

  setConcepts(concepts: Concept[]) {
    this.concepts = concepts;
    this.conceptsChanged.next(this.concepts.slice());
  }

  updateConcept(index: number, concept: Concept) {
    this.concepts[index] = concept;
    this.conceptsChanged.next(this.concepts.slice());
  }

  deleteConcept(index: number) {
    this.concepts.splice(index, 1);
    this.conceptsChanged.next(this.concepts.slice());
  }
}

