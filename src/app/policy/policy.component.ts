import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  step=1;
  closeResult: string;
  policyNumber:any='';
  nextStep=true;
  injured:any;
  thirdparty:false;
  policyreport:false;
  assit:false;
  windshield:false;
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  next()
  {
    this.step++;
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
}
