import {Component, Input, OnInit} from '@angular/core';
import {Concept} from "../../shared/models/concept.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ConceptService} from "../../shared/services/concept.service";

@Component({
  selector: 'app-concept-detail',
  templateUrl: './concept-detail.component.html',
  styleUrls: ['./concept-detail.component.css']
})
export class ConceptDetailComponent implements OnInit {
  private index: number;
  private concept: Concept;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private conceptService: ConceptService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index = +params['index'];
          this.concept = this.conceptService.concepts[this.index];
        }
      )
  }

  onUserClick() {
    this.router.navigate(['user/' + this.concept.user])
  }

}
