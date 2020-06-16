import { Component, Input, OnInit } from "@angular/core";
import { MypageService } from "../../../service/mypage.service";
import { User } from "../../model/user.interface";
import { LoginService } from "src/service/login.service";

@Component({
  selector: "app-mypage",
  templateUrl: "./mypage.component.html",
  styleUrls: ["./mypage.component.css"],
})
export class MypageComponent implements OnInit {
  user: User;
  userId: String;

  constructor(
    private mypageService: MypageService,
    private loginService: LoginService
  ) {
    this.user = {
      _id: null,
      name: null,
      userId: null,
      password: null,
      nickname: null,
      profilePhoto: null,
    };
  }

  ngOnInit() {
    this.userId = this.loginService.getUserId();
  }

  getUser() {
    this.mypageService.getUser().subscribe(
      (user) => (this.user = user),
      (error) => console.log("[MypageService.getUser]", error)
    );
  }
}
