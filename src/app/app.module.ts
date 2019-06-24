import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PolicyComponent } from './policy/policy.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NgbDateCustomParserFormatter } from "./shared/date-formatter.service";
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PolicyComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule ,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
