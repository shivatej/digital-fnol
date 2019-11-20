import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PolicyComponent } from './policy/policy.component';
import { HomeComponent } from './home/home.component';
import { NgbDateCustomParserFormatter } from "./shared/date-formatter.service";
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Routes } from '@angular/router';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {path: 'home', component: AppComponent},
  {path: '', component: AppComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'} 
];

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
    ReactiveFormsModule,
    AmazingTimePickerModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZ5rIF_as0p3eJW08nKkQE2c0EFdmpG1w',
      libraries: ['geometry', 'places']
    })
  ],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
