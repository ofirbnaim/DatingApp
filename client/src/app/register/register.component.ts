import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Allowing to create notifications
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

  constructor(private accountService: AccountService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  register(){
    this.accountService.register(this._model).subscribe( 
      response => { 
        console.log(response);
        this.cancel(); // Call to cancel() function - here in this component
        this.toastr.success('Register has succeeded'); // If Login success, green notification will appear
    }, 
      error => { 
        console.log(error);
        this.toastr.error(error.error); // If Register failed, red notification will appear with the error message
    })
  }

  cancel(){
    // Every time this function calls, the property "cancelRegister" will emmit a "false" answer
    // I can decide wich type to emmit (string/boolean...)
    this.cancelRegiseter.emit(false);
  }
}
