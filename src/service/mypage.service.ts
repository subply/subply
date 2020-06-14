import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../app/model/user.interface";

@Injectable({
  providedIn: "root",
})
export class MypageService {
  userId = "test";
  URL = "http://localhost:3000/user";

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http
      .get<User>(this.URL + `/` + this.userId)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let message = "";

    //클라이언트 에러
    if (errorRes.error instanceof ErrorEvent) {
      console.error(`Client side error: ${errorRes.error.message}`);
      message = errorRes.message;
    } else {
      //백엔드 에러
      console.error(`Server side error: ${errorRes.status}`);
      message = errorRes.message;
    }

    return throwError({
      title: "Someting wrong. try again later.",
      message,
    });
  }
}
