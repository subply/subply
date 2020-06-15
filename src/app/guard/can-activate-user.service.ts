import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CanActivate, Router } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../../service/login.service";

@Injectable()
export class CanActivateUserService implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate([`/login`]);
      return false;
    }
  }
}
