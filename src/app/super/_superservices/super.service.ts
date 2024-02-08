import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";
import { PTO } from "../../auth_models/pto.model";
import { UserList } from "../_Models/userlist.model";
@Injectable({
    providedIn: "root",
})
export class SuperService {
    private token: string = localStorage.getItem("token");

    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }),
    };

    constructor(private http: HttpClient) {}

    getVendorList() {
        return this.http
            .get<PTO[]>(`${environment.ptoListUrl}/list`, this.httpOptions)
            .pipe(retry(1), catchError(this.handleError));
    }

    getVendorById(id: number): Observable<PTO> {
        return this.http
            .get<PTO>(`${environment.ptoIdUrl}/${id}`, this.httpOptions)
            .pipe(retry(1), catchError(this.handleError));
    }

    postVendorVerify(pto: PTO): Observable<PTO> {
        return this.http
            .post<PTO>(`${environment.ptoIdUrl}/verify`, pto, this.httpOptions)
            .pipe(retry(1), catchError(this.handleError));
    }

    getUserList() {
        return this.http.get(`${environment.userlist}`, this.httpOptions).pipe(
            map((res: Array<UserList>) => {
                return res.filter((res) => res.roles[0].name === "ROLE_PTO");
            }, catchError(this.handleError))
        );
    }
    postRejectVendor(payload: PTO): Observable<PTO> {
        return this.http.post<PTO>(
            `${environment.ptoIdUrl}/reject`,
            payload,
            this.httpOptions
        );
    }

    rejectedUserList() {
        return this.http.get<UserList[]>(
            `${environment.ptoIdUrl}/rejectedlist`,
            this.httpOptions
        );
    }

    blacklist_super_true(id) {
        return this.http.put(
            `${environment.rootUrl}/user/blacklisttrue/${id}`,
            id,
            this.httpOptions
        );
    }

    handleError(error) {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // console.log(errorMessage);
        return throwError(errorMessage);
    }
}
