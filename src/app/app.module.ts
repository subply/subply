import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { UrlInputComponent } from "./main/url-input/url-input.component";
import { HeaderComponent } from "./header/header.component";
import { TranslationComponent } from "./main/translation/translation.component";
import { NotFoundComponent } from "./main/not-found/not-found.component";
import { MypageComponent } from "./mypage/mypage.component";
import { RankComponent } from "./rank/rank.component";
import { ChildComponent } from "./main/child/child.component";
import { HookTestComponent } from "./main/hook-test/hook-test.component";

@NgModule({
  declarations: [
    AppComponent,
    UrlInputComponent,
    HeaderComponent,
    TranslationComponent,
    NotFoundComponent,
    MypageComponent,
    RankComponent,
    ChildComponent,
    HookTestComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
