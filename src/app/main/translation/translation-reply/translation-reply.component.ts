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
  translations: Translation;
  loadingState = false;

  constructor(private translationService: TranslationService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.scriptIndex.firstChange) {
      this.getTranslationReply();
      // console.log(
      //   "2번째 이상의 변화. " +
      //     changes.scriptIndex.previousValue +
      //     " => " +
      //     changes.scriptIndex.currentValue
      // );
    }
  }

  getTranslationReply() {
    console.log("getTranslationReply working!");
    this.translationService
      .getTranslations("v=byz_-fKm_6", this.scriptIndex)
      .subscribe(
        (translations) => {
          this.translations = translations;
          this.loadingState = true;
        },
        (error) => console.log(error)
      );
  }
}
