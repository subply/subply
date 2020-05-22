import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UrlInputComponent } from "./main/url-input/url-input.component";
import { TranslationComponent } from "./main/translation/translation.component";
import { NotFoundComponent } from "./main/not-found/not-found.component";
import { MypageComponent } from "./mypage/mypage.component";
import { RankComponent } from "./rank/rank.component";
import { HookTestComponent } from "./main/hook-test/hook-test.component";

const routes: Routes = [
  { path: "", redirectTo: "url-input", pathMatch: "full" },
  { path: "url-input", component: UrlInputComponent },
  { path: "translate", component: TranslationComponent },
  { path: "mypage", component: MypageComponent },
  { path: "rank", component: RankComponent },
  { path: "hook-test", component: HookTestComponent },

  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
