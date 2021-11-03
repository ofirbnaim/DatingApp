import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})

export class TestErrorsComponent implements OnInit {

  _baseUrl = "https://localhost:5001/api/"

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this._baseUrl + "TestErrors/not-found/").subscribe(
      response => { console.log(response)},
      error => { console.log(error)}
    )
  }

  get400Error(){
    this.http.get(this._baseUrl + "TestErrors/bad-request/").subscribe(
      response => { console.log(response)},
      error => { console.log(error)}
    )
  }

  get500Error(){
    this.http.get(this._baseUrl + "TestErrors/server-error/").subscribe(
      response => { console.log(response)},
      error => { console.log(error)}
    )
  }

  get401Error(){
    this.http.get(this._baseUrl + "TestErrors/auth/").subscribe(
      response => { console.log(response)},
      error => { console.log(error)}
    )
  }

  get400ValidationError(){
    this.http.post(this._baseUrl + "account/register", {}).subscribe(
      response => { console.log(response)},
      error => { console.log(error)}
    )
  }
}
