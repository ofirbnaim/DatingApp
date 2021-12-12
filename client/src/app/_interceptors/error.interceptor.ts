import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  // Must added this to app.module.ts
  // This function intercept the errors and return observable thats why i have to use pipe method
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error =>{ // error it is the http respons that i get  
      if(error){
          switch (error.status) {
            case 400: // there is two types of error 400
            // first type
              if(error.error.errors) { // error.error.errors is the error respons object that i get from the browser and can see it in the network tab
                const modalStateErrors = []; // const variable must be initialize, dead in the end of the scope, can changes the value but can't change the point
                for( const key in error.error.errors){
                  if(error.error.errors[key])
                  {
                    modalStateErrors.push(error.error.errors[key]);   
                  }
                }
                // Flatten array of arrays into array
                // must to change the 'lib' section in tsconfig.json to 'es2019'
                throw modalStateErrors.flat();
              }
              // second type
              else {
                this.toastr.error(error.error === null ? "Bad request" : error.error, error.status);
              }
              break;

            case 401:
              this.toastr.error(error.error === null ? "Unauthorized" : error.error, error.status);
              break;
                
            case 404:
              this.toastr.error(error.error === null ? "Page not found" : "Page " + error.error.title, error.status);
              this.router.navigateByUrl('/not-found');
              break;
              
            case 500:
              // passing the error information to the error page
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl('server-error',navigationExtras);
              break;

            default:
              this.toastr.error('Somthing unexpected went wrong');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    )
  }
}
