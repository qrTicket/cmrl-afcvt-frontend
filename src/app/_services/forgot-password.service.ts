import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { forgotPassword } from "../_models/forgotpassword.model";
@Injectable({
    providedIn: "root"
})
export class ForgotPasswordService {
    constructor(private http: HttpClient) {}

    handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    postResetPassword(resetPassword: forgotPassword): Observable<any> {
        return this.http
            .post<any>(
                `${environment.rootUrl}/user/reset/password`,
                resetPassword
            )
            .pipe(
                map(() => resetPassword),
                catchError(this.handleError)
            );
    }

    resetPasswordGetById(id: number): Observable<any> {
        return this.http
            .get<any>(
                `${environment.rootUrl}/user/reset-password-change/${id}`
            )
            .pipe(catchError(this.handleError));
    }

    postChangePassword(
        changePassword: forgotPassword
    ): Observable<any> {
        return this.http
            .post<any>(
                `${environment.rootUrl}/user/change/password`,
                changePassword
            )
            .pipe(
                map(() => changePassword),
                catchError(this.handleError)
            );
    }
}
