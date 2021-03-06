import {Component, Input, OnInit} from '@angular/core';
import {Concept} from "../../shared/models/concept.model";

@Component({
  selector: 'app-concept-item',
  templateUrl: './concept-item.component.html',
  styleUrls: ['./concept-item.component.css']
})
export class ConceptItemComponent implements OnInit {
  @Input() concept: Concept;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
    if (this.concept.likes === undefined) {
      this.concept.likes = 0;
    }
  }

}
