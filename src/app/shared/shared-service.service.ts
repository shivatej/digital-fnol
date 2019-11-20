import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  sendHeading(step: number) {
    this.subject.next(step);
  }

  clearMessage() {
    this.subject.next();
  }

  getHeading(): Observable<any> {
    return this.subject.asObservable();
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.subject.next(isLoggedIn);
  }

  getIsLoggedIn(): Observable<any> {
    return this.subject.asObservable();
  }

  initializeApp(): Promise<any> {

    let headers = {
      'accept': 'application/json',
      'Connection': 'keep-alive',
      'X-CSRF-Token': 'Fetch',
      'Access-Control-Allow-Headers': 'x-auth, content-type'
    }

    let options = { headers: headers };

    // let url = ConfigConstants.clientUrl + 'oshot/oauth/post';
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
    let url = 'https://fnol-project-app.herokuapp.com/upload?url=oshot/oauth/post';
    let reqData = {
      "vehicles": {
        "insurer_id": 2,
        "veh_make": "honda",
        "veh_model": "accord",
        "veh_year": 2009
      },
      "events": {
        "evt_customer": 12067,
        "evt_country": "India",
        "evt_zipCode": "02109",
        "evt_createDate": "2018-01-15T22:10:42"
      }
    };

    return new Promise((resolve, reject) => {
      this.http.post(proxyurl+url, reqData).subscribe((response: any) => {
        console.log("Test....", response);
        // console.log("Test....", response.headers.get('x-csrf-token'));
        setTimeout(() => {
          this.setIsLoggedIn(true);
        });

        resolve(true);
      }, error => {
        this.setIsLoggedIn(false);
        console.error(error)
      });
    });
  }

  uploadDocument(uploadDocbody, imageChkSum) {
    // const authorizedHeaders: HttpHeaders = this.createAuthorizationHeaders();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this.http.post(`url`, uploadDocbody);
      const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
    let url = 'https://fnol-project-app.herokuapp.com/upload?url=oshot/post';
    let reqData = {
      "vehicles": {
        "veh_make": "Jeep Wrangler",
        "veh_model": "782WER",
        "veh_year": "2016"
      },
      "incidents": {
        "idt_country": "US",
        "idt_postalCode": "02210",
        "idt_createDate": "2019-05-08T10:10:37"
      },
      "images": [{
        "img_name": "image1.jpg",
        "img_data": {
          "img_checksum": imageChkSum,
          "base64ByteStream": uploadDocbody
        }
      }]
    };

    return new Promise((resolve, reject) => {
      //this.http.post(url, reqData).subscribe((response: any) => {
      const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
      this.http.post(proxyurl+url, reqData).subscribe((response: any) => {
        console.log("Test....", response);

        resolve(response);
      }, error => {
        this.setIsLoggedIn(false);
        console.error(error)
      });
    });

  }


  finalJson(reqData) {
    console.log(reqData);
    const username = 'iccfnol1';
    const password = 'appian@2';
    let authorizationData = 'Basic ' + btoa(username + ':' + password);

    const headerOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': authorizationData
        })
    };

    let url = 'https://capgemini-indiademo.appiancloud.com/suite/webapi/FavI_Q';
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    return new Promise((resolve, reject) => {
      //this.http.post(url, reqData).subscribe((response: any) => {
      this.http.post(proxyurl+url, reqData,headerOptions).subscribe((response: any) => {
        console.log("Test....", response);

        resolve(response);
      }, error => {
        this.setIsLoggedIn(false);
        console.error(error)
      });
    });
  }


  // createAuthorizationHeaders() {
  //   // let headers = new HttpHeaders({
  //   //   'Content-Type' : 'application/json'
  //   // });
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return headers;
  // }

}
