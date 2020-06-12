import { Component, Input, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { MypageService } from "./mypage.service";
import { User } from "../../model/user.interface";

@Component({
  selector: "app-mypage",
  templateUrl: "./mypage.component.html",
  styleUrls: ["./mypage.component.css"],
})
export class MypageComponent implements OnInit {
  user: User;

  constructor(private http: HttpClient, private mypageService: MypageService) {
    this.user = {
      _id: null,
      name: null,
      userId: null,
      password: null,
      nickname: null,
      profilePhoto: null,
    };
    this.getUser();
  }

  ngOnInit() {}

  getUser() {
    this.mypageService.getUser().subscribe(
      (user) => (this.user = user),
      (error) => console.log("[MypageService.getUser]", error)
    );
  }
}
