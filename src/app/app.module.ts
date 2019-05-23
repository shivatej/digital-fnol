import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PolicyComponent } from './policy/policy.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { SharedServiceService } from './shared/shared-service.service';
import { HttpClientModule } from '@angular/common/http';

export function init_app(appLoadService: SharedServiceService) {
  return () => appLoadService.initializeApp();
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PolicyComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule ,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: APP_INITIALIZER, useFactory: init_app, deps: [SharedServiceService], multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
