import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from '../shared/shared-service.service';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  message: any;
  subscription: Subscription;

  constructor(private sharedServiceService:SharedServiceService) { }

  ngOnInit() {
    this.subscription = this.sharedServiceService.getHeading().subscribe(message => { this.message = message; });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
  
}
