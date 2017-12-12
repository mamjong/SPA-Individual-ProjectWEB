import {RouterModule, Routes} from "@angular/router";
import {ConceptComponent} from "./concept/concept.component";
import {NgModule} from "@angular/core";
import {ConceptDetailComponent} from "./concept/concept-detail/concept-detail.component";
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileEditComponent} from "./profile/profile-edit/profile-edit.component";
import {SignupComponent} from "./signup/signup.component";
import {ConceptEditComponent} from "./concept/concept-edit/concept-edit.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/concepts', pathMatch: 'full'},
  { path: 'concepts', component: ConceptComponent, children: [
    { path: 'new', component: ConceptEditComponent },
    { path: ':index', component: ConceptDetailComponent },
    { path: ':index/edit', component: ConceptEditComponent}
  ] },
  { path: 'user/:username', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, children: [
    { path: 'edit', component: ProfileEditComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
