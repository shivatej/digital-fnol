import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedServiceService } from './shared/shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  title = 'digital-fnol';
  subscription: Subscription;
  isLoggedIn: boolean;
  constructor(private sharedService: SharedServiceService) { console.log("app cons");}

  ngOnInit() {
    this.subscription = this.sharedService.getIsLoggedIn().subscribe(isLoggedIn => { 
      this.isLoggedIn = isLoggedIn;
    }, error => {      
      console.error(error);
    });
    console.log("app init");
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
