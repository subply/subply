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
<<<<<<< HEAD
export class TranslationReplyComponent implements OnChanges {
  @Input() scriptIndex: number;
=======
export class TranslationReplyComponent implements OnChanges, OnInit {
  @Input() scriptIndex: string;
>>>>>>> 6ec81a4cb8c872d811fc1ad3602b1bf991a9fcbd
  @Input() videoId: string;
  translation: Translation;
  loadingState = false;
  user: User;

<<<<<<< HEAD
  newSubply = {
    userId: "",
    translated: "",
    votes: [],
    index: -1,
  };
=======
  constructor(
    private translationService: TranslationService,
    private userService: UserService,
    private loginService: LoginService
  ) {}
>>>>>>> 6ec81a4cb8c872d811fc1ad3602b1bf991a9fcbd

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

<<<<<<< HEAD
  setUser() {
    const userId = sessionStorage.getItem("id");
    if(!userId) {
      alert('로그인 해 주세요');
      return false;
    }
    this.newSubply.userId = userId;
=======
  getUser(userId: String) {
    this.userService.getUser(userId).subscribe(
      (user) => (this.user = user),
      (error) => console.log("[MypageService.getUser]", error)
    );
>>>>>>> 6ec81a4cb8c872d811fc1ad3602b1bf991a9fcbd
  }


  //TODO : 로그인 안해도 섭플 추가됨
  createReply() {
<<<<<<< HEAD
    this.setUser();
    const sentence = (<HTMLInputElement>document.getElementById("sentence")).value;
    if(!sentence) { alert("입력 안 됨"); return false; }
    this.newSubply.translated = sentence;
    this.newSubply.index = this.scriptIndex;
    this.addReply(this.newSubply);
    this.clearText();
  }

  addReply(reply: any) {
    this.translationService.updateTranslation(this.videoId, reply)
    .subscribe((ret)=>console.log(ret));
=======
    const sentence = (<HTMLInputElement>document.getElementById("sentence"))
      .value;

    //로그인 검사
    if (!sessionStorage.getItem("id")) {
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
>>>>>>> 6ec81a4cb8c872d811fc1ad3602b1bf991a9fcbd
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
}
