import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  _title = 'The Dating App';
  _users: any;

  constructor(private http: HttpClient)
  {

  }
  
  ngOnInit(): any 
  {
    this.getUsers();
  }


  getUsers()
  {
    this.http.get('https://localhost:5001/api/users').subscribe( 
        response => { this._users = response; }
      , error => { console.log(error); }
      )
  }
}
