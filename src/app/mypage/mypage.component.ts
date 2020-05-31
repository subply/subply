import { Component, Input, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
  ContributedTime: Number;
}

@Component({
  selector: "app-mypage",
  template: ` {{ user | json }} `,
  styleUrls: ["./mypage.component.css"],
})
export class MypageComponent implements OnInit {
  userId: string;
  user: User;
  URL = "http://localhost:3000/user";
  constructor(private http: HttpClient) {
    this.userId = "ron12";
    this.getUser();
  }

  getUser() {
    this.http
      .get<User>(this.URL + "/" + this.userId) //옵저버블 등록
      .subscribe((user) =>{
        this.user = user;
      });
    //exception 처리는? 매개변수는?
  }

  ngOnInit() {}
}
