import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";

import { UrlInputComponent } from "./main/url-input/url-input.component";
import { TranslationComponent } from "./main/translation/translation.component";
import { NotFoundComponent } from "./main/not-found/not-found.component";
import { MypageComponent } from "./main/mypage/mypage.component";
import { RankComponent } from "./main/rank/rank.component";
import { LoginComponent } from "./header/login/login.component";
import { JoinComponent } from "./header/join/join.component";
import { MyInformationComponent } from "./main/mypage/navigation/my-information/my-information.component";
import { MySubplyComponent } from "./main/mypage/navigation/my-subply/my-subply.component";
import { MyVoteComponent } from "./main/mypage/navigation/my-vote/my-vote.component";
import { CanActivateUserService } from "./guard/can-activate-user.service";

const routes: Routes = [
  { path: "", redirectTo: "url-input", pathMatch: "full" },
  { path: "url-input", component: UrlInputComponent },
  { path: "translate/:id", component: TranslationComponent },
  {
    path: "mypage",
    component: MypageComponent,
    canActivate: [CanActivateUserService],
    children: [
      { path: "", component: MySubplyComponent },
      { path: "mysubply/:userId", component: MySubplyComponent },
      { path: "myvote/:userId", component: MyVoteComponent },
      { path: "myinfo/:userId", component: MyInformationComponent },
    ],
  },
  { path: "rank", component: RankComponent },
  { path: "login", component: LoginComponent },
  { path: "join", component: JoinComponent },

  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateUserService],
})
export class AppRoutingModule {}
