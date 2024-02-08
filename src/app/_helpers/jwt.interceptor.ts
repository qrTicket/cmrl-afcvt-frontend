import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
//import "rxjs/add/operator/do";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpUserEvent,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
} from "@angular/common/http";
import { AuthService } from "../_services/auth.service";
import { catchError } from "rxjs/operators";
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const headersConfig = {
            // "Content-Type": "application/json",
            Accept: "application/json",
        };
        const token = localStorage.getItem("token");
        if (token) {
            headersConfig["Authorization"] = `Bearer ${token}`;
        }
        const request = req.clone({ setHeaders: headersConfig });
        // console.log(request, "Interceptor");

        return next.handle(request).pipe(
            catchError((error) => {
                // console.log(error, "*********Error*******");
                if (error instanceof HttpErrorResponse) {
                    //console.log(error, "New Error&&&&&&&&&&&");
                }
                if (error.status === 401) {
                    this.handleAuth();
                    // this.router.navigate(["/login"]);
                }
                return throwError(error);
            })
        );
    }
    handleAuth() {
        localStorage.removeItem("token");
        localStorage.removeItem("Token");
        this.router.navigate(["/login"]);
    }
}
