import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from '../shared/shared-service.service';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  step: any;
  subscription: Subscription;

  constructor(private sharedServiceService:SharedServiceService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.sharedServiceService.getHeading().subscribe(step => { 
      this.step = step; 
      console.log(this.step);
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
  selectHome() {
    this.router.navigate(['./home']);
  }
}
