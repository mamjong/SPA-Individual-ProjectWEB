import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ConceptsState} from "../../shared/concepts.state";
import {ConceptService} from "../../shared/services/concept.service";
import {Concept} from "../../shared/models/concept.model";
import {Subscription} from "rxjs/Subscription";
import {UserState} from "../../shared/user.state";

@Component({
  selector: 'app-concept-edit',
  templateUrl: './concept-edit.component.html',
  styleUrls: ['./concept-edit.component.css']
})
export class ConceptEditComponent implements OnInit {
  conceptForm: FormGroup;
  private concept: Concept;
  private subscription: Subscription;
  private index: number;
  editMode: boolean;
  state: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private conceptsState: ConceptsState,
              private conceptService: ConceptService,
              private userState: UserState) { }

  ngOnInit() {
    this.state = 'stateless';

    if (this.conceptsState.getFilled()) {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.index = +params['index'];
            this.editMode = params['index'] != null;
            this.concept = this.conceptsState.getConcept(this.index);
            this.initForm();
          }
        );
    }
  }

  onSubmit() {
    if (this.conceptForm.valid) {
      this.state = 'loading';
      if (this.editMode) {
        this.subscription = this.conceptService.putRequest(this.concept.id ,this.conceptForm.value)
          .subscribe(
            (response) => {
              this.concept = new Concept(response.json()._id, response.json().title, response.json().genre,
                response.json().description, response.json().likes, response.json().art, response.json().user);
              this.conceptsState.updateConcept(this.index, this.concept);
            },
            (error) => {
              console.log(error);
              this.subscription.unsubscribe();
              this.state = 'failure';
            },
            () => {
              this.subscription.unsubscribe();
              this.state = 'stateless';
              this.onCancel();
            }
          )
      } else {
        this.subscription = this.conceptService.postRequest(this.conceptForm.value)
          .subscribe(
            (response) => {
              this.concept = new Concept(response.json()._id, response.json().title, response.json().genre,
                response.json().description, response.json().likes, response.json().art,
                this.userState.getUser().username);
              this.conceptsState.pushConcept(this.concept);
            },
            (error) => {
              console.log(error);
              this.subscription.unsubscribe();
              this.state = 'failure';
            },
            () => {
              this.subscription.unsubscribe();
              this.state = 'stateless';
              this.onCancel();
            }
          )
      }
    }
  }

  onAddArt() {
    (<FormArray>this.conceptForm.get('art')).push(
      new FormGroup({
        'path': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteArt(index: number) {
    (<FormArray>this.conceptForm.get('art')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  get formData() { return <FormArray>this.conceptForm.get('art'); }

  private initForm() {
    let conceptTitle = '';
    let conceptGenre = '';
    let conceptDescription = '';
    let conceptArt = new FormArray([]);

    if (this.editMode) {
      conceptTitle = this.concept.title;
      conceptGenre = this.concept.genre;
      conceptDescription = this.concept.description;
      if (this.concept['art']) {
        for (let path of this.concept.art) {
          conceptArt.push(
            new FormGroup({
              '_id': new FormControl(path._id),
              'path': new FormControl(path.path)
            })
          );
        }
      }
    }

    if (this.editMode) {
      this.conceptForm = new FormGroup({
        'title': new FormControl(conceptTitle, Validators.required),
        'genre': new FormControl(conceptGenre, Validators.required),
        'description': new FormControl(conceptDescription, Validators.required),
        'art': conceptArt
      });
    } else {
      this.conceptForm = new FormGroup({
        'title': new FormControl(conceptTitle, Validators.required),
        'genre': new FormControl(conceptGenre, Validators.required),
        'description': new FormControl(conceptDescription, Validators.required),
        'user': new FormControl(this.userState.getUser().username),
        'art': conceptArt
      });
    }
  }
}
