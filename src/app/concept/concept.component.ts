import {Component, OnInit} from '@angular/core';
import {Concept} from "../shared/models/concept.model";
import {Subscription} from "rxjs/Subscription";
import {ConceptService} from "../shared/services/concept.service";
import {ConceptsState} from "../shared/concepts.state";

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css'],

})
export class ConceptComponent implements OnInit {
  concepts: Concept[];
  private subscription: Subscription;
  state: string;

  constructor(private conceptService: ConceptService,
              private conceptsState: ConceptsState) {
  }

  ngOnInit() {

    this.state = 'loading';

    this.concepts = [];

    this.subscription = this.conceptService.getRequest()
      .subscribe(
        (concepts) => {
          concepts.json().forEach((concept) => {
            let conceptModel = new Concept(concept._id, concept.title, concept.genre, concept.description, concept.likes, concept.art, concept.user);
            this.concepts.push(conceptModel);
            this.conceptsState.setConcepts(this.concepts);
          });
        },
        (error) => {
          console.log(error);
          this.subscription.unsubscribe();
          this.state = 'failure';
        },
        () => {
          this.subscription.unsubscribe();
          this.state = 'success';
        });

    this.conceptsState.conceptsChanged
      .subscribe((concepts) => {
        this.concepts = concepts;
      });
  }
}
