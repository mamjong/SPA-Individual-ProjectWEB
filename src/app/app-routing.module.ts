import {RouterModule, Routes} from "@angular/router";
import {ConceptComponent} from "./concept/concept.component";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
  { path: '', redirectTo: '/concepts', pathMatch: 'full'},
  { path: 'concepts', component: ConceptComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
