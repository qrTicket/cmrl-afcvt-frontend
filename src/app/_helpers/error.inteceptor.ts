import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../_services/auth.service";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                console.log(err, "Error interceptor catch error");
                if (err.status === 401) {
                    console.log(err, "Error interceptor");

                    // auto logout if 401 response returned from api
                    this.authenticationService.logout();
                    location.reload();
                }
                else if(err.status === 400){
                    console.log('err caught in errInterceptor');
                }
               
                // const error = err.error.message || err.statusText;
                //const error = err.error.data ;
                //return throwError(error);

                let errObj = {
                    error : {
                        data:err.error.data
                    }
                }
                return throwError(errObj)
            })
        );
    }
}
