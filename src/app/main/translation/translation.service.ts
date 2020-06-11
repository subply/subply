import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Translation } from "../../model/translation.interface";

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  URL = "localhost:3000/translation/"; //video/:videoId/script/:order";

  constructor(private http: HttpClient) {}

  getTranslations(
    videoId: string,
    scriptIndex: string
  ): Observable<Translation> {
    console.log(this.URL + `video/${videoId}/script/${scriptIndex}`);

    return (
      this.http
        // .get<Translation>(this.URL + `video/${videoId}/script/${scriptIndex}`)
        .get<Translation>(
          "http://localhost:3000/translation/video/v=byz_-fKm_6/script/0"
        )
        .pipe(catchError(this.handleError))
    );
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
