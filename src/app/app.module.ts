import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConceptComponent } from './concept/concept.component';
import {AppRoutingModule} from "./app-routing.module";
import { ConceptItemComponent } from './concept/concept-item/concept-item.component';
import {ConceptService} from "./concept/concept.service";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    ConceptComponent,
    ConceptItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [ConceptService],
  bootstrap: [AppComponent]
})
export class AppModule { }
