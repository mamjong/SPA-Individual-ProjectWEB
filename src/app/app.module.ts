import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConceptComponent } from './concept/concept.component';
import {AppRoutingModule} from "./app-routing.module";
import { ConceptItemComponent } from './concept/concept-item/concept-item.component';
import {ConceptService} from "./shared/services/concept.service";
import {UserService} from "./shared/services/user.service";
import {HttpModule} from "@angular/http";
import { ConceptDetailComponent } from './concept/concept-detail/concept-detail.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import {DropdownDirective} from "./shared/directives/dropdown.directive";
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import {DateValueAccessorModule} from "angular-date-value-accessor";
import {BtnAvailableDirective} from './shared/directives/btn-available.directive';
import { SignupComponent } from './signup/signup.component';
import { ConceptEditComponent } from './concept/concept-edit/concept-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ConceptComponent,
    ConceptItemComponent,
    ConceptDetailComponent,
    UserComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    DropdownDirective,
    ProfileEditComponent,
    BtnAvailableDirective,
    SignupComponent,
    ConceptEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DateValueAccessorModule,
    HttpModule
  ],
  providers: [ConceptService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
