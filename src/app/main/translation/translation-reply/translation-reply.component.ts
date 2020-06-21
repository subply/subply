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
  translations: Translation;
  loadingState = false;
  user: User;

  displayMessage = "Sort by...";
  sortOptions = ["Balance", "Company", "Last Name"];

  changeMessage(selectedItem: string) {
    this.displayMessage = "Sort by " + selectedItem;
  }

  newSubply = {
    userId: "",
    translated: "",
    vodtes: [],
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
      this.getTranslations();
    }
  }

  getTranslations() {
    console.log("vodeoId:" + this.videoId);
    this.translationService.getTranslations(this.videoId).subscribe(
      (translations) => {
        this.translations = translations;
        this.loadingState = true;
      },
      (error) => {
        console.log("[getTranslations 에러]" + error);
      }
    );
  }

  returnSubpliesByIndex() {
    this.getTranslations();
    return this.translations.scripts[this.scriptIndex].subplies;
  }

  getUser(userId: String) {
    this.userService.getUser(userId).subscribe(
      (user) => (this.user = user),
      (error) => console.log("[MypageService.getUser]", error)
    );
  }

  setUser() {
    this.newSubply.userId = sessionStorage.getItem("id");
  }

  createReply() {
    this.setUser();
    const sentence = (<HTMLInputElement>document.getElementById("sentence"))
      .value;
    this.newSubply.translated = sentence;
    this.addReply(sentence);
    this.clearText();
  }

  addReply(sentence: String) {
    let translationArr = this.translations.scripts[this.scriptIndex]
      .translations;
    translationArr.push(this.newSubply);
    this.translations.scripts[this.scriptIndex].translations = translationArr;
  }

  clearText() {
    const sentenceButton = <HTMLInputElement>(
      document.getElementById("sentence")
    );

    sentenceButton.value = "";
  }

  changeSort(val: string) {
    if (val === "dateAsc") {
      this.getTranslations();
    } else if (val === "voteAsc") {
      this.sortByVote().reverse();
    } else if (val === "voteDesc") {
      this.sortByVote();
    }
  }

  sortReverse() {
    this.translations.scripts[0].subplies.reverse();
  }

  sortByVote() {
    return this.translations.scripts[0].subplies.sort(function (a, b) {
      return a.votes.length > b.votes.length
        ? -1
        : a.votes.length < b.votes.length
        ? 1
        : 0;
    });
  }
}
