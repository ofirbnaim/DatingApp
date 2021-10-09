import { Component, Input, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Parent to child communication. "usersFromHomeComponent" belong to child component(Register)
  @Input() usersFromHomeComponent: any;

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
