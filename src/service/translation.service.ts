import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import config from "../config/config.json";
import { ErrorHandlerService } from "../service/error-handler.service";
import { Translation } from "../app/model/translation.interface";

@Injectable({
  providedIn: "root",
})
export class TranslationService {
<<<<<<< HEAD
=======
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}
>>>>>>> 6ec81a4cb8c872d811fc1ad3602b1bf991a9fcbd

  getTranslation(videoId: String): Observable<Translation> {
    return this.http
      .get<Translation>(`${config.server_url}/translation/${videoId}`)
<<<<<<< HEAD
      .pipe(catchError(this.handleError));
  }

  updateTranslation(videoId: String, object: Translation): Observable<any> {    
    return this.http
      .put(`${config.server_url}/translation/${videoId}`, object)
      .pipe(catchError(this.handleError));
=======
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateTranslation(videoId: String, object: object): Observable<any> {
    return this.http
      .put(`${config.server_url}/translation/${videoId}`, object)
      .pipe(catchError(this.errorHandler.handleError));
>>>>>>> 6ec81a4cb8c872d811fc1ad3602b1bf991a9fcbd
  }

  deleteSubply(videoId: String, object: object): Observable<Translation> {
    return this.http
      .patch<Translation>(
        `${config.server_url}/translation/subply/${videoId}`,
        object
      )
      .pipe(catchError(this.errorHandler.handleError));
  }
}
