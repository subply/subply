import { Component, OnChanges, Input, SimpleChanges } from "@angular/core";
import { TranslationService } from "../../../../service/translation.service";
import { Translation } from "../../../model/translation.interface";

@Component({
  selector: "translation-reply",
  templateUrl: "./translation-reply.component.html",
  styleUrls: ["./translation-reply.component.css"],
})
export class TranslationReplyComponent implements OnChanges {
  @Input() scriptIndex: string;
  @Input() videoId: string;
  translations: Translation;
  loadingState = false;

  newSubply = {
    userId: "",
    translated: "",
    vodtes: [],
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
    if(!userId) return false;
    this.newSubply.userId = userId;
  }

  createReply() {
    this.setUser();
    const sentence = (<HTMLInputElement>document.getElementById("sentence"))
      .value;
    console.log(sentence);
    // this.newSubply.translated = sentence;
    // this.addReply(sentence);
    // this.clearText();
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
}
