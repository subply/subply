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

  constructor(
    private translationService: TranslationService,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const userId = this.loginService.getUserId();
    this.getUser(userId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.scriptIndex.firstChange) {
      this.getTranslation();
    }
  }

  getTranslation() {
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
    if (!this.loginService.isLoggedIn()) {
      return alert("로그인 후 이용가능 합니다");
      //유효성 검사
    } else if (sentence == "") {
      return alert("글자를 입력해 주세요");
    }

    let newSubply = {
      userId: sessionStorage.getItem("id"),
      translated: sentence,
      votes: [],
      index: this.scriptIndex,
    };

    this.updateTranslation(newSubply);
    this.clearText();
  }

  addReply() {
    let subplies = this.translation.scripts[this.scriptIndex].subplies;
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

  updateTranslation(object: object) {
    this.translationService
      .updateTranslation(this.videoId, object)
      .subscribe((translation) => {
        this.translation = translation;
      }),
      (error) => {
        console.log("[updateTranslation 에러]" + error);
      };
  }

  deleteSubply(_id: string) {
    let object = {
      scriptIndex: this.scriptIndex,
      _id: _id,
    };

    this.translationService
      .deleteSubply(this.videoId, object)
      .subscribe((translation) => {
        this.translation = translation;
      }),
      (error) => {
        console.log("[updateTranslation 에러]" + error);
      };
  }

  addVoteToSubply(object: Object) {
    this.translationService
      .addVoteToSubply(this.videoId, object)
      .subscribe((translation) => {
        this.translation = translation;
      }),
      (error) => {
        console.log("[updateTranslation 에러]" + error);
      };
  }

  vote(subplyId: string) {
    console.log("vote");
    //로그인 검사
    if (!this.loginService.isLoggedIn()) {
      return alert("로그인 후 이용가능 합니다");
    }

    const object = {
      scriptIndex: this.scriptIndex,
      subplyId: subplyId,
      userId: this.user.userId,
    };

    this.addVoteToSubply(object);
  }
}
