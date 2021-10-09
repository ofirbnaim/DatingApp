import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Parent to child communication. "usersFromHomeComponent" belong to child component(Register)
  @Input() usersFromHomeComponent: any;

  // Child to Parent communication. "cancelRegister" emmit event
  @Output() cancelRegiseter = new EventEmitter();

  public _model: any={};

  constructor() { }

  ngOnInit(): void {
    
  }

  register(){
    console.log(this._model);
  }

  cancel(){
    // Every time this function calls, the property "cancelRegister" will emmit a "false" answer
    // I can decide wich type to emmit (string/boolean...)
    this.cancelRegiseter.emit(false);
  }
}
