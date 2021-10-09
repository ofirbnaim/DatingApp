import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Child to Parent communication. "cancelRegister" emmit event
  @Output() cancelRegiseter = new EventEmitter();

  _model: any={};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    
  }

  register(){
    this.accountService.register(this._model).subscribe( 
      response => { 
        // console.log(response);
        this.cancel();
    }, 
      error => { 
        console.log(error);
    })
  }

  cancel(){
    // Every time this function calls, the property "cancelRegister" will emmit a "false" answer
    // I can decide wich type to emmit (string/boolean...)
    this.cancelRegiseter.emit(false);
  }
}
