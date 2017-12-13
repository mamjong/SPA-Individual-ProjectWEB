import {CanActivate, CanActivateChild, Router} from "@angular/router";
import {UserState} from "../user.state";
import {Injectable} from "@angular/core";

@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild {

  constructor(private userState: UserState,
              private router: Router) {}

  canActivate() {
    if (this.userState.getLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild() {
    if (this.userState.getLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/concepts']);
      return false;
    }
  }
}
