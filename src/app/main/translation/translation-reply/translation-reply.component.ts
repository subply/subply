import { Component, Input, SimpleChanges } from "@angular/core";
import { OnChanges } from "@angular/core";
import { TranslationService } from "../../../../service/translation.service";
import { Translation } from "../../../model/translation.interface";
import { User } from "../../../model/user.interface";
import { UserService } from "../../../../service/user.service";
import { LoginService } from "../../../../service/login.service";

import { Script } from "../../../model/script.interface";
import { ScriptsService } from "../../../../service/scripts.service";
import { parseString } from "xml2js";

@Component({
  selector: "translation-reply",
  templateUrl: "./translation-reply.component.html",
  styleUrls: ["./translation-reply.component.css"],
})
export class TranslationReplyComponent implements OnChanges {
  @Input() scriptIndex: number;
  @Input() videoId: string;
  translation: Translation;
  loadingState = false;
  user: User;

  constructor(
    private translationService: TranslationService,
    private scriptService: ScriptsService,
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

  toggleVote(subplyId: string) {
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

  clickSubplyDownload() {
    this.getScript();
  }

  getScript() {
    if (this.videoId) {
      this.scriptService.getXMLScript(this.videoId).subscribe((xmlScripts) => {
        let scripts = [];

        if (!xmlScripts) {
          return alert("다운로드 에러 발생");
        }

        scripts = this.parsingXML(xmlScripts, scripts);
        this.makeSubplyDownloadContents(scripts);
      });
    }
  }

  parsingXML(xmlScripts: any, scripts: Array<any>) {
    parseString(xmlScripts, { explicitArray: false }, (error, result) => {
      if (error) {
        throw new Error("parseString error: " + error);
      }

      const returned_scripts = result.transcript.text;
      returned_scripts.map((script) => {
        const _start = parseFloat(script.$.start);
        const _end = _start + parseFloat(script.$.dur);

        const start = new Date(script.$.start * 1000)
          .toISOString()
          .substr(11, 12)
          .replace(".", ",");

        const end = new Date(_end * 1000)
          .toISOString()
          .substr(11, 12)
          .replace(".", ",");

        let _script = {
          script: script._,
          startTime: start,
          endTime: end,
        };

        scripts.push(_script);
      });
    });

    return scripts;
  }

  sortSubplyByScriptIndex(index: number) {
    let copySubplies = Array.from(this.translation.scripts[index].subplies);
    return copySubplies.sort(function (a, b) {
      return a.votes.length > b.votes.length
        ? -1
        : a.votes.length < b.votes.length
        ? 1
        : 0;
    });
  }

  makeSubplyDownloadContents(youtubeScripts: Array<Script>) {
    let content = "";
    let finishedSubply = true;

    youtubeScripts.every((_youtubScript, index) => {
      let _content = "";
      let subplies = this.sortSubplyByScriptIndex(index);

      if (!subplies[0] || subplies[0].translated === undefined) {
        finishedSubply = false;
        console.log("섭플이 없으" + index);
        return false;
      }
      let translated = subplies[0].translated;
      _content = `${index}\n${_youtubScript.startTime} --> ${_youtubScript.endTime}\n${translated}\n\n`;
      content += _content;
      return true;
    });

    if (!finishedSubply) return alert("섭플이 완료되지 않은 영상입니다.");

    this.downloadSubply(content);
  }

  downloadSubply(data: string) {
    const blob = new Blob([data], { type: "text/srt" });
    this.downloadBlob(this.videoId + ".srt", blob);
  }

  public downloadBlob(fileName: string, blob: Blob): void {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, fileName);
    } else {
      const anchor = window.document.createElement("a");
      anchor.href = window.URL.createObjectURL(blob);
      anchor.download = fileName;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(anchor.href);
    }
  }
}
