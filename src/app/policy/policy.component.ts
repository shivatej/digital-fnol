import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceService } from '../shared/shared-service.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  step=0;
  closeResult: string;
  policyNumber:any='';
  nextStep=true;
  injured:any;
  thirdparty:false;
  policyreport:false;
  assit:false;
  windshield:false;
  isPolicyButton:boolean = false;
  isDriverButton:boolean = false;
  isPassengerButton:boolean = false;
  nextEnable:boolean = false;
  l1=false;l2=false;
  f1 =false; f2  =false; f3=false;
  constructor(private modalService: NgbModal,private sharedServiceService:SharedServiceService) {}

  ngOnInit() {
    this.sharedServiceService.sendHeading(0);
  }

  next()
  {
    this.step++;
    this.sharedServiceService.sendHeading(this.step);
  }



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  openpolicy(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((result) => {
    }, (reason) => {
      
    });
  }

}
