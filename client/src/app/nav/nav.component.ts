import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Allowing to create notifications
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
  
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }
  
  ngOnInit(): void {
  }
  
  
  login(){
    this.accountService.login(this._model)
    .subscribe(
      response => { 
      this.router.navigateByUrl('/members'); // If Login success, the user rout to members component
      this.toastr.success("You are logged in!"); // If Login success, green notification will appear
      }, 
      )
    }
    
    logout(){ 
      this.router.navigateByUrl('/') // Navigate back to home componenet
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