import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

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

  CardDetails() {
    let url = 'https://uat-api.fenrisdigital.com/api/v1/prefill?apiKey=57b6f484-b208-11e9-a2a3-2a2ae2dbcce4&address="1636 E Sierra Vista Dr  Phoenix AZ 85016"&business="Liberty Home Repair"';
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin' : '*'
      })
    };
    return new Promise((resolve, reject) => {
      this.http.get(proxyurl+url,httpOptions).subscribe((response: any) => {
        console.log("Test....", response);

        resolve(response);
      }, error => {
        this.setIsLoggedIn(false);
        console.error(error)
      });
    });
  }

  scanCard(uploadDocbody, imageChkSum) {
    const headers = new HttpHeaders().set('X-FullContact-APIKey', 'ie3RQssBfjXeQpBMcI0xB5mSbpWtVWSG');
    // return this.http.post(`url`, uploadDocbody);
      const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
    let url = 'https://api.fullcontact.com/v2/cardReader?webhookUrl=myWebhookURL';
    let reqData = {
      "base64ByteStream": uploadDocbody
    };

    return new Promise((resolve, reject) => {
      //this.http.post(url, reqData).subscribe((response: any) => {
      this.http.post(proxyurl+url, reqData).subscribe((response: any) => {
        console.log("Test....", response);

        resolve(response);
      }, error => {
        this.setIsLoggedIn(false);
        console.error(error)
      });
    });

  }


}
