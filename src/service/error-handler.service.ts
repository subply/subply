import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService {
  constructor() {}

  handleError(errorRes: HttpErrorResponse) {
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
