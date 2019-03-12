import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isPolicyButton:boolean = false;
  isDriverButton:boolean = false;
  isPassengerButton:boolean = false;
  nextEnable:boolean = false;

  constructor(private modalService: NgbModal) { }
  

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
    }, (reason) => {
      
    });
  }

  buttonStatus(){

  }

}
