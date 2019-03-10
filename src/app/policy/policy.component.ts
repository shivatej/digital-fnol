import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  step=3;
  constructor() { }

  ngOnInit() {
  }

  next()
  {
    this.step++;
  }
}
