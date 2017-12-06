import { Component, OnInit } from '@angular/core';
import {Concept} from "./concept.model";
import {User} from "../shared/user.model";

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css']
})
export class ConceptComponent implements OnInit {
  concepts: Concept[];
  testConcept: Concept;
  testUser: User;

  constructor() { }

  ngOnInit() {
    this.testUser = new User('Maanmidejo', 'Mark de Jong', '1999-06-29', 'Hi there!');
    this.testConcept = new Concept('TestConcept', 'MMORPG', 'Just a great MMORPG', 24,
      [{path: 'https://eu.battle.net/forums/static/images/game-logos/game-logo-wow.png'}], this.testUser);
    this.concepts = [];
    this.concepts.push(this.testConcept);
  }

}
