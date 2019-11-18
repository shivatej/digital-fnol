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

  CardDetails(address, businessName) {
    // let url = 'https://uat-api.fenrisdigital.com/api/v1/prefill?apiKey=57b6f484-b208-11e9-a2a3-2a2ae2dbcce4&address="1636 E Sierra Vista Dr  Phoenix AZ 85016"&business="Liberty Home Repair"';
    // const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Access-Control-Allow-Origin' : '*'
    //   })
    // };
    // return new Promise((resolve, reject) => {
    //   this.http.get(proxyurl+url,httpOptions).subscribe((response: any) => {
    //     console.log("Test....", response);

    //     resolve(response);
    //   }, error => {
    //     this.setIsLoggedIn(false);
    //     console.error(error)
    //   });
    // });
    let url = 'uat-api.fenrisdigital.com/api/v1/prefill';
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin' : '*'
      }),
      params: {'apiKey': '57b6f484-b208-11e9-a2a3-2a2ae2dbcce4',
               'address':  address,
               'business': businessName           
              }
    };
    return new Promise((resolve, reject) => {
      this.http.get(proxyurl+url,httpOptions).subscribe((response: any) => {
         resolve(response);
      }, error => {
        this.setIsLoggedIn(false);
        console.error(error)
      });
    });
  }

  scanCard(uploadDocbody, imageChkSum) {
    // const headers = new HttpHeaders().set('X-FullContact-APIKey', 'ie3RQssBfjXeQpBMcI0xB5mSbpWtVWSG');
    
    //   const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
    // let url = 'https://api.fullcontact.com/v2/cardReader?webhookUrl=myWebhookURL';
    // let reqData = {
    //   "base64ByteStream": uploadDocbody
    // };

    // return new Promise((resolve, reject) => {
     
    //   this.http.post(proxyurl+url, reqData).subscribe((response: any) => {
    //     console.log("Test....", response);

    //     resolve(response);
    //   }, error => {
    //     this.setIsLoggedIn(false);
    //     console.error(error)
    //   });
    // });

  const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
    let url = 'https://cloud-westus.ocrsdk.com/v2/processBusinessCard?exportFormat=xml'; 
    let username :string = "SMC-digital direct"
    let pass : string =  "Jip+2W1/0AToB5LVKWN7ykVo"
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+ btoa(username+":"+pass),
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin' : '*'
      }) 
    }
  
      return new Promise((resolve, reject) => {
      
      this.http.post(proxyurl+url, uploadDocbody,httpOptions).subscribe((response: any) => {
        resolve(response);
      }, error => {
        this.setIsLoggedIn(false)
        console.error("error---->"+error)
        
      });
    });

  }
  GetresultUrls(TaskId){
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
    let url2 = 'https://cloud-westus.ocrsdk.com/v2/getTaskStatus';
    let username :string = "SMC-digital direct"
    let pass : string =  "Jip+2W1/0AToB5LVKWN7ykVo"
    const httpOptions2 ={
        headers : new HttpHeaders({
          'Authorization': 'Basic '+ btoa(username+":"+pass),
          'X-Requested-With': 'XMLHttpRequest',
        }),
        params : {'taskId': TaskId}
   }
   return new Promise((resolve,reject)=>{
     this.http.get(proxyurl+url2, httpOptions2).subscribe((response:any)=>{
       //console.log("Test of First GetRequest->",response);
       //console.log(response.resultUrls[0])
      resolve(response);
     }, error => {
      this.setIsLoggedIn(false)
      console.error("error---->"+error)
      console.log(proxyurl+url2)
    });
   });
  }


}
