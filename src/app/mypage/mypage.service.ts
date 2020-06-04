import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/user.interface";

@Injectable({
  providedIn: "root",
})
export class MypageService {
  userId = "ron12";
  URL = "http://localhost:3000/user";

  constructor(private http: HttpClient, private httpHandler: HttpHandler) {}

  getUser(): Observable<User> {
    return this.http.get<User>(this.URL + `/` + this.userId);
  }
}
