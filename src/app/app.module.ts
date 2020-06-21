import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { UrlInputComponent } from "./main/url-input/url-input.component";
import { HeaderComponent } from "./header/header.component";
import { TranslationComponent } from "./main/translation/translation.component";
import { NotFoundComponent } from "./main/not-found/not-found.component";
import { MypageComponent } from "./main/mypage/mypage.component";
import { RankComponent } from "./main/rank/rank.component";
import { FooterComponent } from "./footer/footer.component";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { RawScriptComponent } from "./main/raw-script/raw-script.component";
import { TranslationReplyComponent } from "./main/translation/translation-reply/translation-reply.component";
import { LoginComponent } from "./header/login/login.component";
import { JoinComponent } from "./header/join/join.component";
import { MyInformationComponent } from "./main/mypage/navigation/my-information/my-information.component";
import { MyVoteComponent } from "./main/mypage/navigation/my-vote/my-vote.component";
import { MySubplyComponent } from "./main/mypage/navigation/my-subply/my-subply.component";
import { MyNavbarComponent } from "./main/mypage/my-navbar/my-navbar.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UrlInputComponent,
    HeaderComponent,
    TranslationComponent,
    NotFoundComponent,
    MypageComponent,
    RankComponent,
    FooterComponent,
    RawScriptComponent,
    TranslationReplyComponent,
    LoginComponent,
    JoinComponent,
    MyInformationComponent,
    MyVoteComponent,
    MySubplyComponent,
    MyNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
