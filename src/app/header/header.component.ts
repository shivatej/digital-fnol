import { Component, OnInit } from '@angular/core';
import {SharedServiceService} from '../shared/shared-service.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  step: any;
  subscription: Subscription;

  constructor(private sharedServiceService:SharedServiceService, private modalService: NgbModal) { }

  ngOnInit() {
    this.subscription = this.sharedServiceService.getHeading().subscribe(step => { 
      this.step = step; 
      console.log(this.step);
    });
  }

  /*openLoginModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
    }, (reason) => {
    });
  }*/

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
  
}
