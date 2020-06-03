import { Component, Input, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MypageService } from "./mypage.service";

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

@Component({
  selector: "app-mypage",
  templateUrl:"./mypage.component.html",
  styleUrls: ["./mypage.component.css"],
})
export class MypageComponent implements OnInit {
  user: User;
  errorMessage: string;

  constructor(private http: HttpClient, private mypageService: MypageService) {
    this.getUser();
  }

  ngOnInit() {}

  getUser() {
    this.mypageService.getUser().subscribe(
      (user) => (this.user = user),
      (error) => (this.errorMessage = error)
    );

    //exception 처리는? 매개변수는?
  }
}
