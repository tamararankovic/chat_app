import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {

  constructor() { }

  public selected : string = null;

  ngOnInit(): void {
  }

  receiveMessage($event) {
    this.selected = $event
  }
}
