import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { AssignUser } from "../_models/assign-user.model";
import { Observable } from "rxjs";
import { AssignUserComponent } from "../assign-user/assign-user.component";
@Injectable({
    providedIn: "root",
})
export class AssignUserService {
    constructor(private http: HttpClient) {}
    private token: string = localStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }),
    };

    assignUser(assignUser: AssignUser): Observable<AssignUser> {
        return this.http.post<AssignUser>(
            `${environment.assignUserURL}/add`,
            assignUser,
            this.httpOptions
        );
    }

    assignUserList() {
        return this.http.get<AssignUser[]>(
            `${environment.assignUserURL}/list`,
            this.httpOptions
        );
    }

    deleteAssignUser(id: Number): Observable<AssignUser> {
        return this.http.delete<AssignUser>(
            `${environment.assignUserURL}/delete/${id}`,
            this.httpOptions
        );
    }
    assignUserById(id): Observable<AssignUser> {
        return this.http.get<AssignUser>(
            `${environment.assignUserURL}/${id}`,
            this.httpOptions
        );
    }
    updateAssignedUser(
        payload: AssignUser,
        id: Number
    ): Observable<AssignUser> {
        const assignData = {
            id: payload.id,
            createdDate: payload.createdDate,
            status: payload.status,
            roles: {
                id: payload.roles,
            },
            user: {
                id: payload.user,
            },
            line: {
                id: payload.line,
            },
            station: {
                id: payload.station,
            },
        };
        return this.http.put<AssignUser>(
            `${environment.assignUserURL}/update/${id}`,
            assignData,
            this.httpOptions
        );
    }

    trueStatus(id: Number): Observable<AssignUser> {
        return this.http.put<AssignUser>(
            `${environment.assignUserURL}/statustrue/${id}`,
            id,
            this.httpOptions
        );
    }
}
