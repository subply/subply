import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import config from "../config/config.json";
import { ErrorHandlerService } from "../service/error-handler.service";
import { UserInfo } from "../app/model/userInfo.interface";

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  addUserInfo(userInfo: UserInfo): Observable<any> {
    return this.http.post(`${config.server_url}/userinfo`, userInfo)
    .pipe(catchError(this.errorHandler.handleError));
  }
}
