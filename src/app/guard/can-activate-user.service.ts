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
      window.alert("로그인 후 이용 바랍니다.");
      return true;
    } else {
      console.log("로그인 안되어 있음!");
      this.router.navigate([`/login`]);
      return false;
    }
  }
}
