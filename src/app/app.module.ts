import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConceptComponent } from './concept/concept.component';
import {AppRoutingModule} from "./app-routing.module";
import { ConceptItemComponent } from './concept/concept-item/concept-item.component';
import {ConceptService} from "./concept/concept.service";
import {UserService} from "./user/user.service";
import {HttpModule} from "@angular/http";
import { ConceptDetailComponent } from './concept/concept-detail/concept-detail.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./shared/login.service";
import { ProfileComponent } from './profile/profile.component';
import {DropdownDirective} from "./shared/dropdown.directive";
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import {DateValueAccessorModule} from "angular-date-value-accessor";

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
    ProfileEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DateValueAccessorModule,
    HttpModule
  ],
  providers: [ConceptService, UserService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
