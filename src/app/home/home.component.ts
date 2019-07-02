import { Component, OnInit, NgZone, ViewChild, ElementRef} from '@angular/core';
import { NgModel } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SharedServiceService } from '../shared/shared-service.service';
import CRC32 from 'crc-32/crc32.js';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private imageSrc: string = '';
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
  imageChkSum : any;
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
  model:any;
  responseData : any;
  imageData:any;
  createdDate : any;
  modelDOB:string;
  time:any;
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
  secondImgUrl:object = {};
  minDate = {year: 1950, month: 1, day: 1};
  accInfo: boolean = false;
  scores:any;
  isLoading:boolean = false;
  elemtArry:any;
  latitude: number;
  longitude: number;
  mapselected: boolean = false;
  zoom: number;
  private geoCoder;
  secondImage: boolean = false;
  address: string;
  secondImageData: any;
  private secondImageSrc: string = '';
  imageChkSumScnd: any;
  carsDropDown: any;
  menuList: boolean = false;
  dropdown_adressList: any;
  pg16no:boolean = false;
  pg16Continue: boolean = false;
  form: FormGroup;
  buildingdamages = [];
  contentdamages = [];
  valuabledamages = [];
  enableOtherText:boolean = false;
  otherText: boolean = false;
  valuableOtherText: boolean = false;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(private sharedServiceService:SharedServiceService,private modalService: NgbModal, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private router: Router, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      buildingdamages: new FormArray([]),
      contentdamages: new FormArray([]),
      valuabledamages : new FormArray([])
    });

    // of(this.getOrders()).subscribe(orders => {
    //   this.orders = orders;
    //   this.addCheckboxes();
    // });
    this.buildingdamages = this.getBuildingdamages();
    this.contentdamages = this.getContentdamges();
    this.valuabledamages = this.getValuabledamages();
    this.addCheckboxes();
  }

  ngOnInit() {
    this.carsDropDown = [
      "Toyota Camry 2018-782WER",
      "Chevrolet Colorado 2018-782WER",
      "Honda Civic 2016-FWV76"
    ];
    this.dropdown_adressList = [
      "261 South Helen St.Mount Juliet, TN 37122",
      "230 North Helen St.Mount Juliet, TN 37126",
      "236 East Helen St.Mount Juliet, TN 37125"
    ]
  }

  secondImgInputChanges(e){
    this.secondImage = true;
    this.handleInputChange(e);
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
      if (this.secondImage) {
        this._handleReaderSecnd(event);
      } else {
        this._handleReaderLoaded(event);
      }
     
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
    const data = event.target.result;
    this.imageSrc = btoa(data);
    this.imageData = 'data:image/png;base64,' + this.imageSrc;
    this.imageChkSum = this.getCheckSumValue(data);
  }

  _handleReaderSecnd(event) {
    switch(this.userSelectReport) {
      case "3rd party":
        this.secondImgUrl['3rdParty'] = event.target;
        break;
      case "police report":
        this.secondImgUrl['policeReport'] = event.target;
        break;
      case "car Image":
        this.secondImgUrl['carImage'] = event.target;
        break;
    }
    this.step = 11;
    const data = event.target.result;
    this.secondImageSrc = btoa(data);
    this.secondImageData = 'data:image/png;base64,' + this.secondImageSrc;
    this.imageChkSumScnd = this.getCheckSumValue(data);
  }

 //   let reader = new FileReader();
// reader.readAsDataURL(fileEvnt.file);
// this.convertBTOA(reader).subscribe(fileBase64 => {const findIndex = this.uploadList.findIndex(doc => doc.file.name == fileEvnt.file.name);
// if (findIndex > -1 && !this.uploadList[findIndex]['DocumentId'])
// {
//    this.uploadRequest(fileSize, fileBase64, fileEvnt.file.name, fileEvnt.file.type);
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

  createElemntsArray(elements) {
    var elementsArray = [];
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].ele_part && elements[i].ele_dmgType) {
          elementsArray.push ({ "damgedpart" : elements[i].ele_part,
          "damgedetails": elements[i].ele_dmgType
        })
      }
    }
    var output = [];
    elementsArray.forEach(function(item) {
      var existing = output.filter(function(v, i) {
        return v.damgedpart=== item.damgedpart;
      });
      if (existing.length > 0) {
        var existingIndex = output.indexOf(existing[0]);
        if ( typeof item.damgedetails === 'object' ) {
          for (var m = 0; m < item.damgedetails.length; m++) {
            if ( ! output[existingIndex].damgedetails.includes(item.damgedetails[m])) {
              output[existingIndex].damgedetails = output[existingIndex].damgedetails.concat(item.damgedetails[m]);
            }
          }
      } else {
          if (!output[existingIndex].damgedetails.includes(item.damgedetails)) {
            output[existingIndex].damgedetails = output[existingIndex].damgedetails.concat(item.damgedetails);
          }   
        }
      } else {
        if (item.damgedetails !== "none") {
          if ((typeof item.damgedetails === 'string')) {
            item.damgedetails = [item.damgedetails];
          }
            output.push(item);
        }
      }
    });
    return output;
    }

  uploadDoc() {
    this.isLoading = true;
    this.step = 14;
    this.sharedServiceService.uploadDocument(this.imageSrc, this.imageChkSum).then((data: any) => {
    this.responseData = data;
    this.scores = this.responseData.scores;
    this.elemtArry = this.createElemntsArray(this.responseData.elements);
    console.log("success..", this.responseData.scores[0].sco_minCost);
    this.isLoading = false;
      //window.open("https://www.google.com", "_blank");
    }, (err) => {  });
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
    if(this.step === 14) {
      this.step = 11;
    } else if (this.step === 15) {
        this.step = 5;
    } else {
        this.step--;
    }
  }

  checkUserDetails(){
    if( this.firstName && this.lastName && this.modelDOB){
      this.pg2PolicyClick = true;
    }
  }
  checkAccDetails(){
    if( this.time && this.model && this.incidentDesc){
       this.createdDate = this.model.year + "-"+this.model.month +"-"+ this.model.day+"T"+this.time.hour +":"+this.time.minute+":"+this.time.second;
      this.pg6Continue = true;
    }
  }

  checkAccidentDetails(){
    if( (this.zipCode || ( this.address && this.address.length > 0)) && (this.phoneNumber || this.email)){
      this.pg7Continue = true;
    }
  }

  gotoPageAccDetail(){
    this.step = 9;
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


  checkForPolicyNum() {
    if(this.policyNumber.length == 0){
      this .policyNumber ='877643001';
    }
    this.nextPage();
  }

  enableMap() {
    this.mapselected = !this.mapselected;
    if (this.mapselected) {
      this.longitude = -87.952377;
      this.latitude = 41.840794;
      this.zoom = 8;
     }
  }

   // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = -87.952377;
        this.latitude = 41.840794;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
     
    
  }


  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder = new google.maps.Geocoder;
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  onKeydown(event) {
    if (event.key === "Enter") {
    this.enableMap();
    this.mapsAPILoader.load().then(() => {
        this.geoCoder = new google.maps.Geocoder;
          let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            types: ["address"]
          });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });
    }
  }

  toggleAdressMenu() {
   //this.menuList = !this.menuList;
   this.menuList = false;
   this.listMenu = false;
  }

  carOrPropertyPolicy() {
    if (this.listMenu) {
      this.step = 6;
    } else if (this.menuList) {
      this.step = 15;
    }
  }

  getBuildingdamages() {
    return [
      { name: 'Air Conditioner/Heater' },
      { name: 'Building (Extension)' },
      {name: 'Carpets'},
      { name: 'Ceiling' },
      { name: 'Window' },
      { name: 'Wall' },
      { name: 'Parking lot' },
      { name: 'Other' }
    ];
  }

  getContentdamges () {
     return [
      { name: 'Appliances' },
      { name: 'Computers and Electronics' },
      { name: 'Furniture(Interior & Exterior)' },
      { name: 'Other Equipments' },
      { name: 'Signs' },
      { name: 'Tools' },
      { name: 'Other' }
    ];
  }

  getValuabledamages () {
     return [
      { name: 'Atm cards/Credi cards' },
      { name: 'cash' },
      { name: 'Gold/Silver/Other precious metals' },
      { name: 'Jewellery' },
      { name: 'Other' }
    ];
  }

  submit(type, modal) {
    console.log(modal);
    if (type === "buildingdamages") {
      const selectedBdamages = this.form.value.buildingdamages
      .map((v, i) => v ? this.buildingdamages[i].name : null)
      .filter(v => ((v !== name)&& (v !== null)));   
    } else if(type === "contentdamages") {
      const selectedCdamages = this.form.value.contentdamages
      .map((v, i) => v ? this.contentdamages[i].name : null)
      .filter(v => ((v !== name)&& (v !== null))); 
    } else {
      const selectedCdamages = this.form.value.valuabledamages
      .map((v, i) => v ? this.valuabledamages[i].name : null)
      .filter(v => ((v !== name)&& (v !== null)));
    }
     modal.dismiss('Cross click');
  }

  addCheckboxes() {
    this.buildingdamages.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.buildingdamages as FormArray).push(control);
    });

    this.contentdamages.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.contentdamages as FormArray).push(control);
    });

    this.valuabledamages.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.valuabledamages as FormArray).push(control);
    });
  }

  checkBoxInput(e, label, type) {
    if (label === "Other" && e.target.checked) {
      if (type === "buildingdamages") {
        this.enableOtherText = true;
      } else if (type === "contentdamages") {
        this.otherText = true;
      } else {
        this.valuableOtherText = true;
      }
    } else if (label === "Other") {
      if (type === "buildingdamages") {
        this.enableOtherText = false;
      } else if (type === "contentdamages") {
        this.otherText = false;
      } else {
        this.valuableOtherText = false;
      }
    }
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
