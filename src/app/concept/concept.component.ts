import { Component, OnInit } from '@angular/core';
import {Concept} from "./concept.model";
import {Subscription} from "rxjs/Subscription";
import {ConceptService} from "./concept.service";

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit {
  private concepts: Concept[];
  private subscription: Subscription;

  constructor(private conceptService: ConceptService) { }

  ngOnInit() {
    this.subscription = this.conceptService.itemsChanged
      .subscribe((concepts) => {
        this.concepts = concepts;
      });
    this.conceptService.getItems();
  }

}
