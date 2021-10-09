import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService{

  _baseUrl = 'https://localhost:5001/api/';

  // Type of Observable that holds a collection of Users
  private currentUserSource = new ReplaySubject<User>(1);

  // ccurentUser$ is an observable now
  _currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this._baseUrl + 'account/login', model).pipe(
      map((response: User) =>{
        const user = response;
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user)); // Save the user to the local storage of the browser
          this.currentUserSource.next(user);
        }
      })
    )
  }

  
  logout(){
    localStorage.removeItem('user'); // Remove the user from the local storage of the browser
    this.currentUserSource.next(null); // When we logout we set the buffer to null
  }
  
  
  register(model: any){
    // I am sending the user to the API and also write it into to browser local memory
    return this.http.post(this._baseUrl + 'account/register', model).pipe(
      map((response: User) =>{
        if(response)
        {
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUserSource.next(response);
        }
        // If i want to see back the user in register componenet or in the console, i have to return it here
        // return response;
      })
    )
  }


  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

}
