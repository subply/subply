import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "my-navbar",
  templateUrl: "./my-navbar.component.html",
  styleUrls: ["./my-navbar.component.css"],
})
export class MyNavbarComponent implements OnInit {
  @Input() userId: String;
  constructor() {}

  ngOnInit(): void {}
}
