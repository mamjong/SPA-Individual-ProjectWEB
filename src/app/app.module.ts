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
import {FormsModule} from "@angular/forms";
import {LoginService} from "./login/login.service";

@NgModule({
  declarations: [
    AppComponent,
    ConceptComponent,
    ConceptItemComponent,
    ConceptDetailComponent,
    UserComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [ConceptService, UserService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
