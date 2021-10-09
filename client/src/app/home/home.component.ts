import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';

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

  // This function initialized by the child property - "cancelRegister" from Home.Html which send True or False
  cancelRegisterMode(event: boolean){
    this._registerMode = event;
  }
}
