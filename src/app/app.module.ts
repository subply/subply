import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UrlInputComponent } from "./main/url-input/url-input.component";
import { HeaderComponent } from "./header/header.component";
import { TranslationComponent } from "./main/translation/translation.component";

@NgModule({
  declarations: [
    AppComponent,
    UrlInputComponent,
    HeaderComponent,
    TranslationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
