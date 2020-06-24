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
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getTranslations(videoId: String): Observable<Translation> {
    return this.http
      .get<Translation>(`${config.server_url}/translation/${videoId}`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateTranslation(videoId: String, object: Translation): Observable<any> {
    return this.http
      .put(`${config.server_url}/translation/${videoId}`, object)
      .pipe(catchError(this.errorHandler.handleError));
  }
}
