import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of as observableOf, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Register } from "../auth_models/register.model";

const credentialsKey = "currentUser";
const _Roles = "Roles";
const _Token = "Token";
const _t = "token";
@Injectable({
    providedIn: "root",
})
export class AuthService {
    currentUserValue: any;
    public message: any;
    private rootUrl = environment.rootUrl;
    

    constructor(private http: HttpClient) { }
    login(username: string, password: string, roleCode:string): Observable<any> {
        return this.http.post<any>(`${this.rootUrl}/signin`, { username, password, roleCode }).pipe(
                map((user) => {
                    // login successful if there's a jwt token in the response
                    if (user.status === "1") {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        const storage = localStorage;
                        storage.setItem(credentialsKey, JSON.stringify(user.data.username));
                        storage.setItem("profilename", JSON.stringify(user.data.username));
                        storage.setItem(_Roles, JSON.stringify(user.data.authorities[0].authority));
                        storage.setItem(_Token, JSON.stringify(user));
                        storage.setItem(_t, user.data.accessToken);
                    }
                    if(user.status === "2"){
                        const storage = localStorage;
                        storage.setItem("username", user.username);
                    }
                    return user;
                })
            );
    }

    changeFirstPassword(username:string, oldPassword:string , newPassword:string){
        return this.http.post<any>(`${this.rootUrl}/first/change/password`, {username, oldPassword, newPassword})
        .pipe(map((user)=>{
            return user;
        }))
    }




    logout(): Observable<boolean> {
        // remove user from local storage to log user out
        localStorage.removeItem(credentialsKey);
        localStorage.removeItem(_Roles);
        localStorage.removeItem(_Token);
        localStorage.removeItem(_t);
        localStorage.removeItem("profilename");
        localStorage.removeItem("username");
        localStorage.removeItem("navigateDashboard");
        localStorage.removeItem("data_name");
        localStorage.removeItem("data_username");
        localStorage.removeItem("data_email");
        localStorage.removeItem("data_empId");
        localStorage.removeItem("data_mobileNumber");
        localStorage.removeItem("data_stationCode");
        return observableOf(true);
    }
    isLogin() {
        if (localStorage.getItem(credentialsKey)) {
            return true;
        }
        return false;
    }

    //function to get all user roles
    getRoles(){
        return this.http.get(`${environment.rootUrl}/role/all`);
    }
}
