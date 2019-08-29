import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PolicyComponent } from './policy/policy.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


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
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
