import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  _model: any = {} // The object that holds the "two way binding"
  _loggedIn: boolean; // Determine if to show options on nav bar or not 

  constructor(private accountService: AccountService) { }

  ngOnInit(): void 
  {
   
  }

  login(){
    this.accountService.login(this._model)
        .subscribe(
          response => { console.log(response); this._loggedIn = true;}, 
          error    => { console.log(error);}
        )
  }

  logout(){
    this._loggedIn = false;
  }

}
