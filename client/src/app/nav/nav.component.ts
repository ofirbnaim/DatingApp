import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  
  _model: any = {} // The object that holds the "two way binding"
  
  constructor(public accountService: AccountService) { }
  
  ngOnInit(): void {
  }
  
  
  login(){
    this.accountService.login(this._model)
    .subscribe(
      response => { console.log(response);}, 
      error    => { console.log(error);}
      )
    }
    
    logout(){ 
      this.accountService.logout();
    }
    
    
  }
  



  //_loggedIn: boolean; // Determine if to show options on nav bar or not (it's a flag)
  
/* 
login(){
    this.accountService.login(this._model)
        .subscribe(
          response => { console.log(response); this._loggedIn = true;}, 
          error    => { console.log(error);}
        )
  }

  logout(){ 
    this._loggedIn = false;
    this.accountService.logout();
  }

  // Lesson number 55
  getCurrentUser(){
    this.accountService.currentUser$.subscribe( user => {
      this._loggedIn = !!user;
    }, error => {
      console.log(error);
    }) // The !! make the object to boolean
  }
*/