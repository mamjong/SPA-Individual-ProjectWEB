import {RouterModule, Routes} from "@angular/router";
import {ConceptComponent} from "./concept/concept.component";
import {NgModule} from "@angular/core";
import {ConceptDetailComponent} from "./concept/concept-detail/concept-detail.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/concepts', pathMatch: 'full'},
  { path: 'concepts', component: ConceptComponent },
  { path: 'concepts/:index', component: ConceptDetailComponent },
  { path: 'user/:username', component: UserComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
