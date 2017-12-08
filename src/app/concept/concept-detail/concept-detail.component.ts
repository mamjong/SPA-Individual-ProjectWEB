import { Component, OnInit } from '@angular/core';
import {Concept} from "../concept.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ConceptService} from "../concept.service";

@Component({
  selector: 'app-concept-detail',
  templateUrl: './concept-detail.component.html',
  styleUrls: ['./concept-detail.component.css']
})
export class ConceptDetailComponent implements OnInit {
  private concept: Concept;
  private id: number;

  constructor(private conceptService: ConceptService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['index'];
          this.concept = this.conceptService.getConcept(this.id);
        }
      )
  }

  onUserClick() {
    this.router.navigate(['user/' + this.concept.user])
  }

}
