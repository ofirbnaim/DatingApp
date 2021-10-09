import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  _title = 'The Dating App';
  _users: any;
  _token: string;

  constructor(private http: HttpClient, private accountService: AccountService)
  {

  }
  
  ngOnInit(): any 
  {
    this.setCurrentUser();
  }

  // Make the Login persistent
  setCurrentUser()
  {
    // Convert the user from string back to User type (it is the opposite operation i did in account.service.ts)
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}
