import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { UrlInputComponent } from "./main/url-input/url-input.component";
import { HeaderComponent } from "./header/header.component";
import { TranslationComponent } from "./main/translation/translation.component";
import { NotFoundComponent } from "./main/not-found/not-found.component";
import { MypageComponent } from './mypage/mypage.component';
import { RankComponent } from './rank/rank.component';
import { YouTubePlayerModule } from '@angular/youtube-player';


@NgModule({
  declarations: [
    AppComponent,
    UrlInputComponent,
    HeaderComponent,
    TranslationComponent,
    NotFoundComponent,
    MypageComponent,
    RankComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, [YouTubePlayerModule]],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
