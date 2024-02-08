import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { param } from "jquery";
import { PTO } from "../auth_models/pto.model";
import { UserProfile } from "../_models/userProfile.model";
import { EditProfile } from "../_models/editProfile.model";
@Injectable({
    providedIn: "root",
})
export class UserProfileService {
    constructor(private http: HttpClient) {}

    private token: string = localStorage.getItem("token");
    private currentUser = localStorage.getItem("currentUser");

    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }),
    };

    UserProfile(): Observable<any> {
        return this.http.get(
            `${environment.rootUrl}/profile`,
            this.httpOptions
        );
    }
    
    // change password - privacy
    changePassword(password: String): Observable<any> {
        return this.http.post(
            `${environment.rootUrl}/user/change/password`,
             password,
            this.httpOptions
        );
    }

    //update the station details
    updateUserProfile(profile: EditProfile):Observable<EditProfile>{
        return this.http.post<EditProfile>(`${environment.rootUrl}/change/updateProfile`,profile, this.httpOptions);
    }
}
