import { Component, Input, SimpleChanges } from "@angular/core";
import { OnInit, OnChanges } from "@angular/core";
import { TranslationService } from "../../../../service/translation.service";
import { Translation } from "../../../model/translation.interface";
import { User } from "../../../model/user.interface";
import { UserService } from "../../../../service/user.service";
import { LoginService } from "../../../../service/login.service";

@Component({
  selector: "translation-reply",
  templateUrl: "./translation-reply.component.html",
  styleUrls: ["./translation-reply.component.css"],
})
export class TranslationReplyComponent implements OnChanges, OnInit {
  @Input() scriptIndex: string;
  @Input() videoId: string;
  translation: Translation;
  loadingState = false;
  user: User;

  newSubply = {
    userId: "",
    translated: "",
    votes: [],
  };

  constructor(
    private translationService: TranslationService,
    private userService: UserService,
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

  ngOnInit(): void {
    let userId = this.loginService.getUserId();
    this.getUser(userId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.scriptIndex.firstChange) {
      this.getTranslation();
    }
  }

  getTranslation() {
    console.log("vodeoId:" + this.videoId);
    this.translationService.getTranslation(this.videoId).subscribe(
      (translation) => {
        this.translation = translation;
        this.loadingState = true;
      },
      (error) => {
        console.log("[getTranslation 에러]" + error);
      }
    );
  }

  updateTranslation(object: object) {
    this.translationService
      .updateTranslation(this.videoId, object)
      .subscribe((translation) => (this.translation = translation)),
      (error) => {
        console.log("[updateTranslation 에러]" + error);
      };
  }

  returnSubpliesByIndex() {
    this.getTranslation();
    return this.translation.scripts[this.scriptIndex].subplies;
  }

  getUser(userId: String) {
    this.userService.getUser(userId).subscribe(
      (user) => (this.user = user),
      (error) => console.log("[MypageService.getUser]", error)
    );
  }

  createReply() {
    const sentence = (<HTMLInputElement>document.getElementById("sentence"))
      .value;

    //로그인 검사
    if (!sessionStorage.getItem("id")) {
      return alert("로그인 후 이용가능 합니다");
      //유효성 검사
    } else if (sentence == "") {
      return alert("글자를 입력해 주세요");
    }
    this.newSubply.userId = sessionStorage.getItem("id");
    this.newSubply.translated = sentence;
    this.addReply();
    this.clearText();
  }

  addReply() {
    let subplies = this.translation.scripts[this.scriptIndex].subplies;
    subplies.push(this.newSubply);
    this.updateTranslation(subplies);
  }

  clearText() {
    const sentenceButton = <HTMLInputElement>(
      document.getElementById("sentence")
    );

    sentenceButton.value = "";
  }

  changeSort(val: string) {
    if (val === "dateDesc") {
      this.getTranslation();
    } else if (val === "voteAsc") {
      this.sortByVote().reverse();
    } else if (val === "voteDesc") {
      this.sortByVote();
    }
  }

  sortReverse() {
    this.translation.scripts[0].subplies.reverse();
  }

  sortByVote() {
    return this.translation.scripts[0].subplies.sort(function (a, b) {
      return a.votes.length > b.votes.length
        ? -1
        : a.votes.length < b.votes.length
        ? 1
        : 0;
    });
  }
}
