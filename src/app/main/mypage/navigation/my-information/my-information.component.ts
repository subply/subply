import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from "../../../../../service/user.service";
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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["userId"];
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => console.log("[getUser 에러]" + error)
    );
  }

  updateUser(obj: any) {
    this.userService.updateUser(this.userId, obj).subscribe((user) => {
      this.user = user;
    }),
      (error) => console.log("[updateUser 에러]" + error);
  }

  ngOnSubmit(userForm: NgForm) {
    if (userForm.valid) {
      this.updateUser(userForm.value);
    }

    if (userForm.invalid) {
      return alert("입력한 값이 올바르지 않습니다.");
    }
  }
}
