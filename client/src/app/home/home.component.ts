import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _users: any;
  public _registerMode: boolean = false;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this._registerMode = !this._registerMode;
  }

  getUsers()
  {
    this.http.get('https://localhost:5001/api/users').subscribe( 
      response => { this._users = response; }
      , error => { console.log(error); }
      )
  }
}
