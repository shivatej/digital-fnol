import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

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
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'authorization': 'Bearer '
    });

    return new Promise((resolve, reject) => {
      this.http.get('/assets/config.json').subscribe((config: any) => {
        console.log("Test....", config);
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

  uploadDocument(uploadDocbody) {
    // const authorizedHeaders: HttpHeaders = this.createAuthorizationHeaders();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`url`, uploadDocbody);

  }

  // createAuthorizationHeaders() {
  //   // let headers = new HttpHeaders({
  //   //   'Content-Type' : 'application/json'
  //   // });
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return headers;
  // }

}
