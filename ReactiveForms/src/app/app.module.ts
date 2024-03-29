import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgBrazil } from "ng-brazil";
import { TextMaskModule } from "angular2-text-mask";
import { CustomFormsModule } from "ng2-validation";

import { AppComponent } from "./app.component";
import { MenuComponent } from "./navegacao/menu/menu.component";
import { HomeComponent } from "./navegacao/home/home.component";
import { FooterComponent } from "./navegacao/footer/footer.component";
import { SobreComponent } from "./institucional/sobre/sobre.component";
import { rootRouterConfig } from "./app.routes";
import { CadastroComponent } from "./demos/reactiveForms/cadastro/cadastro.component";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    SobreComponent,
    CadastroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TextMaskModule,
    NgBrazil,        
    CustomFormsModule,
    ReactiveFormsModule,
    [
      RouterModule.forRoot(rootRouterConfig, {
        useHash: false,
        relativeLinkResolution: "legacy",
      }),
    ],
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
