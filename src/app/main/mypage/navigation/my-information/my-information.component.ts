import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LoginService } from "../../../../../service/login.service";
import { User } from "../../../../model/user.interface";

@Component({
  selector: "app-my-information",
  templateUrl: "./my-information.component.html",
  styleUrls: ["./my-information.component.css"],
})
export class MyInformationComponent implements OnInit {
  userId: String;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.getUser();
  }

  getUser() {
    this.loginService.getUser(this.userId).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => console.log("[getUser 에러]" + error)
    );
  }

  ngOnSubmit(userForm: NgForm) {}
}
