import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SharedServiceService } from '../shared/shared-service.service';
import CRC32 from 'crc-32/crc32';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private imageSrc: string = '';
  private imageChkSum: any;
  isPolicyButton:boolean = false;
  radio:boolean = false;
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
  url:object = {};
  minDate = {year: 1950, month: 1, day: 1};


  constructor(private sharedServiceService:SharedServiceService,private modalService: NgbModal) {}
  

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
  toggleMenu(){
    this.listMenu = !this.listMenu;
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

  gotoPageAccDetail(){
    this.step = 8;
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        switch(this.userSelectReport) {
          case "3rd party":
            this.url['3rdParty'] = event.target;
            break;
          case "police report":
            this.url['policeReport'] = event.target;
            break;
          case "car Image":
            this.url['carImage'] = event.target;
            break;
        }
        this.nextPage();
      }
    }
  }

  handleInputChange(e) {
    //const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const file = e.target.files[0];
    const reader = new FileReader();
    let pattern = /image-*/;
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.addEventListener('load', (event: any) => {
      this._handleReaderLoaded(event);
    });
    reader.readAsBinaryString(file);
    //reader.onload = this._handleReaderLoaded.bind(this);
    //reader.readAsDataURL(file);
  }

  getCheckSumValue(data){
    const crcVal = CRC32.bstr(data);
    const hexVal = this.lpad((crcVal >>> 0).toString(16), 8, "0");
    return hexVal;
  }

  lpad(s, len, chr) {
    const L = len - s.length;
    const C = chr || " ";
    if (L <= 0) {
    return s;
    }
    return new Array(L + 1).join(C)+ s;
  };



  _handleReaderLoaded(event) {
    switch(this.userSelectReport) {
      case "3rd party":
        this.url['3rdParty'] = event.target;
        break;
      case "police report":
        this.url['policeReport'] = event.target;
        break;
      case "car Image":
        this.url['carImage'] = event.target;
        break;
    }
    this.nextPage();
    // let reader = e.target;
    // this.imageSrc = reader.result.split('data:image/png;base64,')[1];
    // // this.imageSrc = reader.result;
    // var crcVal = btoa(reader.result);
    // this.imageChkSum = crc.crc32(crcVal).toString(16);
    // // this.imageChkSum = lpad((this.imageChkSum >>> 0).toString(16), 8, '0');
    // console.log("imageChkSum = ", this.imageChkSum)
    // console.log(this.imageSrc)
    const data = event.target.result;
    this.imageSrc = btoa(data);
    this.imageChkSum = this.getCheckSumValue(data);
  }

//   let reader = new FileReader();
// reader.readAsDataURL(fileEvnt.file);
// this.convertBTOA(reader).subscribe(fileBase64 => {const findIndex = this.uploadList.findIndex(doc => doc.file.name == fileEvnt.file.name);
// if (findIndex > -1 && !this.uploadList[findIndex]['DocumentId'])
// {
// 	this.uploadRequest(fileSize, fileBase64, fileEvnt.file.name, fileEvnt.file.type);
// }
// });
convertBTOA(reader) {
	return Observable.create((observer:any) => {reader.onload = function () {
			let base64String = (reader.result as string).split(';base64,')[1];
			observer.next(base64String);
			observer.complete();

		};
	});
}

uploadDoc() {
  this.sharedServiceService.uploadDocument(this.imageSrc, this.imageChkSum).then((data: any) => {
    console.log("success..");
    this.step = 8;
  }, (err) => {  });

}

}
