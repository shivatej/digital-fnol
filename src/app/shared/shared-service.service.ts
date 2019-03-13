import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private subject = new Subject<any>();
  
  constructor() { }

  sendHeading(message: string) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getHeading(): Observable<any> {
    return this.subject.asObservable();
  }

}
