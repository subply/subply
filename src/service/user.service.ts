import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import config from "../config/config.json";
import { ErrorHandlerService } from "../service/error-handler.service";
import { User } from "../app/model/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getUser(userId: String): Observable<User> {
    return this.http
      .get<User>(`${config.server_url}/user/${userId}`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateUser(userId: String, object: any): Observable<User> {
    //API 호출
    return this.http
      .patch<User>(`${config.server_url}/user/${userId}`, object)
      .pipe(catchError(this.errorHandler.handleError));
  }

  addUser(profilePhoto: object): Observable<any> {
    return this.http.post(`${config.server_url}/user`, profilePhoto, {responseType: 'text'})
    .pipe(catchError(this.errorHandler.handleError));
  }
}
