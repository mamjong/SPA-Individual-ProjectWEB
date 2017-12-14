import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {dateLimitValidator} from "../../shared/validators/date-limit.validator";
import {UserState} from "../../shared/user.state";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  private user: User;
  private minDate: Date;
  private minDateYear: number;
  private subscription: Subscription;
  state: string;

  constructor(private userService: UserService,
              private userState: UserState,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.state = 'stateless';
    this.user = this.userState.getUser();
    this.minDate = new Date();
    this.minDateYear = this.minDate.getFullYear() - 100;
    this.minDate.setFullYear(this.minDateYear, 1, 1);
    this.initForm();
  }

  onSubmit() {
    if (this.profileForm.valid) {

      this.state = 'loading';

      this.subscription = this.userService.putRequest(this.user.username, this.profileForm.value)
        .subscribe(
          (response) => {
            if (response.json()._id) {
              this.user.name = response.json().name;
              this.user.DoB = response.json().DoB;
              this.user.bio = response.json().bio;

              this.userState.setUser(this.user);
            }
          },
          (error) => {
            console.log(error);
            this.state = 'failure';
            this.subscription.unsubscribe();
          },
          () => {
            this.subscription.unsubscribe();
            this.onCancel();
          }
        )
    }
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  private initForm() {
    let profileName;
    let profileDoB;
    let profileBio;

    const user = this.userState.getUser();

    profileName = user.name;
    profileDoB = user.DoB;
    profileBio = user.bio;

    this.profileForm = new FormGroup({
      'name': new FormControl(profileName),
      'DoB': new FormControl(profileDoB, dateLimitValidator(this.minDate)),
      'bio': new FormControl(profileBio)
    });
  }
}
