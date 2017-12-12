import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Concept} from "../../shared/models/concept.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ConceptService} from "../../shared/services/concept.service";
import {UserState} from "../../shared/user.state";
import {Subscription} from "rxjs/Subscription";
import {ConceptsState} from "../../shared/concepts.state";

@Component({
  selector: 'app-concept-detail',
  templateUrl: './concept-detail.component.html',
  styleUrls: ['./concept-detail.component.css']
})
export class ConceptDetailComponent implements OnInit {
  private index: number;
  concept: Concept;
  madeByUser: boolean;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private conceptService: ConceptService,
              private userState: UserState,
              private conceptsState: ConceptsState) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index = +params['index'];
          this.concept = this.conceptsState.getConcept(this.index);
          let loggedInUser = this.userState.getUser();
          if (loggedInUser !== undefined){
            if (this.concept.user === loggedInUser.username) {
              console.log('if');
              this.madeByUser = true;
            } else {
              console.log('else');
              this.madeByUser = false;
            }
          }
        }
      )
  }

  onUserClick() {
    this.router.navigate(['user/' + this.concept.user])
  }

  onEditConcept() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteConcept() {

    this.subscription = this.conceptService.deleteRequest(this.concept.id)
      .subscribe(
        () => {
          console.log('emitted');
          this.router.navigate(['/concepts']);
          this.conceptsState.deleteConcept(this.index);
        },
        (error) => {
          console.log(error);
          this.subscription.unsubscribe();
        },
        () => {
          this.subscription.unsubscribe();
        }
      )
  }
}
