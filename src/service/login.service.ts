import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import config from "../config/config.json";
import { Observable, throwError } from "rxjs";
import { User } from "../app/model/user.interface";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  getUser(userId: String): Observable<User> {
    console.log(userId);

    return this.http
      .get<User>(`${config.server_url}/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  login(id, password): Observable<any> {
    return this.http.post<any>(`${config.server_url}/user/login`, {
      id,
      password,
    });
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

  private handleError(errorRes: HttpErrorResponse) {
    let message = "";
    if (errorRes.error instanceof ErrorEvent) {
      console.error(`Client side error: ${errorRes.error.message}`);
      message = errorRes.message;
    } else {
      console.error(`Sever side error: ${errorRes.status}`);
      message = errorRes.message;
    }

    return throwError({
      title: "HTTP 에러 발생",
      message,
    });
  }
}
