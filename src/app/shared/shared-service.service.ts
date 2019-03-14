import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private subject = new Subject<any>();
  
  constructor() { }

  sendHeading(step: number) {
    this.subject.next(step);
  }

  clearMessage() {
    this.subject.next();
  }

  getHeading(): Observable<any> {
    return this.subject.asObservable();
  }

}
