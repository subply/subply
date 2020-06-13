import { Component, OnChanges, Input, SimpleChanges } from "@angular/core";
import { TranslationService } from "../translation.service";
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

    this.setUser();
  }

  getTranslations() {
    this.translationService.getTranslations(this.videoId).subscribe(
      (translations) => {
        this.translations = translations;
        this.loadingState = true;
      },
      (error) => console.log("[getTranslations 에러]" + error)
    );
  }

  setUser() {
    this.newSubply.userId = sessionStorage.getItem("id");
  }

  createReply() {
    //translation 객체에 포함,서비스 호출,input 비우기,
    const sentence = (<HTMLInputElement>document.getElementById("sentence"))
      .value;
    this.newSubply.translated = sentence;
    this.addReply(sentence);
    this.clearText();
  }

  addReply(sentence: String) {
    //서비스 호출. 더하려는 객체와 식별자 넘기기

    let translationArr = this.translations.scripts[this.scriptIndex]
      .translations;
    translationArr.push(this.newSubply);
    this.translations.scripts[this.scriptIndex].translations = translationArr;

    // this.translationService
    //   .updateTranslation("v=byz_-fKm_6", this.translations)
    //   .subscribe(
    //     (translations) => {
    //       this.translations = translations;
    //     },
    //     (error) => console.log("[getTranslations 에러]" + error)
    //   );
  }

  clearText() {
    const sentenceButton = <HTMLInputElement>(
      document.getElementById("sentence")
    );

    sentenceButton.value = "";
  }
}
