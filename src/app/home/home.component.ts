import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
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
  step:number = 1;
  pg2PolicyClick:boolean = false;
  listMenu:boolean = false;
  pg3Continue:boolean = false;
  pg6Continue: boolean = false;
  uploaded3rdparty: boolean = false;
  uploadedpolice:boolean = false;
  uploadedcar:boolean = false;
  pg6no:boolean = false;
  homeAccbtn:boolean = false;
  accSitebtn:boolean = false;
  bodyShpbtn:boolean = false;
  pg7Continue:boolean = false;
  policyNumber:string ="";
  userSelectReport: string;
  model:string;
  modelDOB:string;
  time:string;
  lastName:string;
  firstName:string;
  incidentDesc:string;
  zipCode:string;
  phoneNumber:string;
  email:string;
  fullName:string;
  phoneNum:string;
  Email:string;
  cardesc:string;
  carImageDesc:string;


  constructor(private modalService: NgbModal) { }
  

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
    }, (reason) => {
    });
  }

  nextPage(){
    this.step++;
  }
  homePage(){
    this.step =1;
  }
  toggleMenu(){
    this.listMenu = !this.listMenu;
  }
  revertPage(){
    this.step = 8;
  }
  preSubmissionPage(){
    this.step = 11;
  }
  prevPage(){
    this.step--;
  }

  checkUserDetails(){
    if( this.firstName && this.lastName && this.modelDOB){
      this.pg2PolicyClick = true;
    }
  }
  checkAccDetails(){
    if( this.time && this.model && this.incidentDesc){
      this.pg6Continue = true;
    }
  }

  checkAccidentDetails(){
    if( this.zipCode && (this.phoneNumber || this.email)){
      this.pg7Continue = true;
    }
  }

  checkdate(){
  }

  gotoPageAccDetail(){
    this.step = 8;
  }

}
