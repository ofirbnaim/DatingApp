import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public _registerMode: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  registerToggle(){
    this._registerMode = !this._registerMode;
  }

}
