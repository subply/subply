import { Component, OnChanges, Input, SimpleChanges } from "@angular/core";
import { TranslationService } from "../../../../service/translation.service";
import { Translation } from "../../../model/translation.interface";

@Component({
  selector: "translation-reply",
  templateUrl: "./translation-reply.component.html",
  styleUrls: ["./translation-reply.component.css"],
})
export class TranslationReplyComponent implements OnChanges {
  @Input() scriptIndex: number;
  @Input() videoId: string;
  translations: Translation;
  loadingState = false;

  newSubply = {
    userId: "",
    translated: "",
    votes: [],
    index: -1,
  };

  constructor(private translationService: TranslationService) {}

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
        console.log(translations);
      },
      (error) => console.log("[getTranslations 에러]" + error)
    );
  }

  setUser() {
    const userId = sessionStorage.getItem("id");
    if(!userId) {
      alert('로그인 해 주세요');
      return false;
    }
    this.newSubply.userId = userId;
  }

  createReply() {
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
  }

  clearText() {
    const sentenceButton = <HTMLInputElement>(
      document.getElementById("sentence")
    );

    sentenceButton.value = "";
  }
}
