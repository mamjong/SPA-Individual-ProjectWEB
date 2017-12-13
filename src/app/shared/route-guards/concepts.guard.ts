import {CanActivate, CanActivateChild, Router} from "@angular/router";
import {ConceptsState} from "../concepts.state";
import {Injectable} from "@angular/core";

@Injectable()
export class ConceptsGuard implements CanActivateChild, CanActivate {

  constructor(private conceptsState: ConceptsState,
              private router: Router) {}

  canActivate() {
    if (this.conceptsState.getFilled()) {
      return true;
    } else {
      this.router.navigate(['/concepts']);
      return false;
    }
  }

  canActivateChild() {
    if (this.conceptsState.getFilled()) {
      return true;
    } else {
      this.router.navigate(['/concepts']);
      return false;
    }
  }
}
