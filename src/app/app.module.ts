import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { UrlInputComponent } from "./main/url-input/url-input.component";
import { HeaderComponent } from "./header/header.component";
import { TranslationComponent } from "./main/translation/translation.component";
import { NotFoundComponent } from "./main/not-found/not-found.component";

import { MypageComponent } from "./mypage/mypage.component";
import { RankComponent } from "./rank/rank.component";
import { FooterComponent } from "./footer/footer.component";
import { YouTubePlayerModule } from '@angular/youtube-player';
import { RawScriptComponent } from './main/raw-script/raw-script.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
