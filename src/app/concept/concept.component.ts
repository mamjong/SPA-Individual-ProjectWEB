import {Component, OnInit} from '@angular/core';
import {Concept} from "../shared/models/concept.model";
import {Subscription} from "rxjs/Subscription";
import {ConceptService} from "../shared/services/concept.service";

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css'],

})
export class ConceptComponent implements OnInit {
  private concepts: Concept[];
  private subscription: Subscription;

  constructor(private conceptService: ConceptService) {
  }

  ngOnInit() {

    this.concepts = [];

    this.subscription = this.conceptService.getRequest()
      .subscribe(
        (concepts) => {
          concepts.json().forEach((concept) => {
            let conceptModel = new Concept(concept._id, concept.title, concept.genre, concept.description, concept.likes, concept.art, concept.user);
            this.concepts.push(conceptModel);
          });
          this.conceptService.concepts = this.concepts;
        },
        (error) => {
          console.log(error);
          this.subscription.unsubscribe();
        },
        () => {
          this.subscription.unsubscribe();
        });
  }
}
