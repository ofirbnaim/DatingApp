import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public _model: any={};

  constructor() { }

  ngOnInit(): void {
    
  }

  register(){
    console.log(this._model);
  }

  cancel(){
    console.log('cancelled');
  }
}
