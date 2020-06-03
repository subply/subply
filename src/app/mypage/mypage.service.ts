import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";

interface User {
  _id: object;
  Videos: [];
  Translations: [];
  Votes: [];
  Name: string;
  UserId: string;
  Password: string;
  Nickname: string;
  ProfileImage: string;
  ContributedTime: number;
}

@Injectable({
  providedIn: "root",
})
export class MypageService {
  userId = "ron12";
  URL = "http://localhost:3000/user";

  constructor(private http: HttpClient, private httpHandler: HttpHandler) {}

  getUser(): Observable<User> {
    return this.http.get<User>(this.URL + "/" + this.userId);
  }
}
