import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UrlInputComponent } from "./main/url-input/url-input.component";
import { TranslationComponent } from "./main/translation/translation.component";
import { NotFoundComponent } from "./main/not-found/not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "url-input", pathMatch: "full" },
  { path: "url-input", component: UrlInputComponent },
  { path: "translation", component: TranslationComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
