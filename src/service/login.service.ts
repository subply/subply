import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import config from "../config/config.json";
import { ErrorHandlerService } from "../service/error-handler.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  login(id, password): Observable<any> {
    return this.http
      .post<any>(`${config.server_url}/user/login`, {
        id,
        password,
      })
      .pipe(catchError(this.errorHandler.handleError));
  }

  setSessionStorage(id) {
    sessionStorage.setItem("id", id);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem("id") ? true : false;
  }

  getUserId() {
    return sessionStorage.getItem("id");
  }
}
