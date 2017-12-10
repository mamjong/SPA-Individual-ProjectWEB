import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../shared/login.service";
import {User} from "../../shared/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {dateLimitValidator} from "../../shared/datelimit.directive";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  private profileForm: FormGroup;
  private user: User;
  private minDate: Date;
  private minDateYear: number;

  constructor(private loginService: LoginService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.user = this.loginService.getUser();
    this.minDate = new Date();
    this.minDateYear = this.minDate.getFullYear() - 100;
    this.minDate.setFullYear(this.minDateYear, 1, 1);
    this.initForm();
  }

  onSubmit() {
    this.loginService.updateUser(this.user.username, this.profileForm.value)
      .then((response) => {

        let jsonResponse = response.json();

        this.user.name = jsonResponse.name;
        this.user.DoB = jsonResponse.DoB;
        this.user.bio = jsonResponse.bio;

        this.loginService.setUser(this.user);

        this.onCancel();
      })
      .catch((error) => {
        console.log('failed with error: ' + error);
      })
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  private initForm() {
    let profileName;
    let profileDoB;
    let profileBio;

    const user = this.loginService.getUser();

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
