import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Translation } from "../app/model/translation.interface";
import config from "../config/config.json";
@Injectable({
  providedIn: "root",
})
export class TranslationService {

  constructor(private http: HttpClient) {}

  getTranslations(videoId: String): Observable<Translation> {
    return this.http
      .get<Translation>(`${config.server_url}/translation/${videoId}`)
      .pipe(catchError(this.handleError));
  }

  updateTranslation(videoId: String, object: Translation): Observable<any> {    
    return this.http
      .put(`${config.server_url}/translation/${videoId}`, object)
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
