import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AddUser } from '../_models/addUser.model';
import { Observable, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UpdateUserUSM } from '../_models/updateUserUSM.model';
import { updateStatus } from '../_models/updateStatus.model';



@Injectable({
    providedIn: 'root',
})
export class AddUserService {
    //this will store all data of selected user
    userData:any;

    constructor(private http: HttpClient, 
        private router:Router, 
        ) {}
    private token: string = localStorage.getItem('token');
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        }),
    };

    //fetching all roles in adduser form
    getAllRoles() {
        return this.http.get(`${environment.rootUrl}/roles/all`);
    }

    //fetch list of roles on which user manager can operate
    getRolesToAdd() {
        return this.http.get(`${environment.rootUrl}/list/roles/usm`);
    }

    //add new user 
    addUser(addUser: AddUser): Observable<AddUser> {
        return this.http.post<AddUser>(
            `${environment.rootUrl}/signup`,
            addUser,
            this.httpOptions
        );
    }

    //will fetch all user list which are created by User-Manager
    userList() {
        return this.http.get<AddUser[]>(
            `${environment.rootUrl}/user/forUSM`,
            this.httpOptions
        );
    }

       // User count
       userCount() {
        return this.http.get<AddUser[]>(
            `${environment.rootUrl}/user/count`,
            this.httpOptions
        );
    }

    getUserById(id) {
        return this.http.get<AddUser>(
            `${environment.rootUrl}/user/${id}`,
            this.httpOptions
        );
    }

    //User Manager will update other Users details
    updateUser(payload: UpdateUserUSM ): Observable<UpdateUserUSM> {
        return this.http.post<UpdateUserUSM>(
            `${environment.rootUrl}/change/updateProfileUSM`, payload, this.httpOptions
        );
        
        
    }

    deleteUser(id) {
        return this.http.delete(
            `${environment.rootUrl}/user/delete/${id}`,
            this.httpOptions
        );
    }
    userBlacklist(id): Observable<any> {
        return this.http.put(
            `${environment.rootUrl}/user/blacklisttrue/${id}`,
            id,
            this.httpOptions
        );
    }

    getBlacklistUsers() {
        return this.http.get(
            `${environment.rootUrl}/user/Blacklist/list`,
            this.httpOptions
        );
    }

    getAllStation() {
        return this.http.get(`${environment.productUrl}/station/notall`, this.httpOptions);
        // .pipe( map(
        //     data => {
        //         return data["data"].filter(s => s.stationCode !== "ALL" )
        //     }    
        // ));
    }

    // edit-profile - admin // working
    getUserProfile() {
        return this.http.get(
            `${environment.rootUrl}/profile`,
            this.httpOptions
        );
    }


    //fetch data of selected user from userList
    //reason to store user data in localStorage is that hitting database is an expensive operation so 
    //fetch user data once from database, store it in localStorage and then perform different operation on it 
    //without hitting database
    //and while logout clear localStorage
    getUserUpdateData(user){
        localStorage.setItem("data_name", user.name);
        localStorage.setItem("data_username", user.username);
        localStorage.setItem("data_email", user.email);
        localStorage.setItem("data_empId", user.empId);
        localStorage.setItem("data_mobileNumber", user.mobileNumber);
        localStorage.setItem("data_stationCode", user.stationCode);
        this.userData = user;
    }

    //update User Manager Profile by sending JSON file with updated data
    editUserManagerProfile(updateUSMdetails: AddUser): Observable<AddUser>{
        return this.http.post<AddUser>(`${environment.rootUrl}/change/updateProfile`, updateUSMdetails, this.httpOptions);

        //below API will update empId, name, mobileNumber, email, role and station of current loggedIn user-manager and username is readonly
        //return this.http.post<AddUser>(`${environment.rootUrl}/change/updateProfileUSM`, updateUSMdetails, this.httpOptions);
    }

    //activate/deactivate user accounts
    statusUpdate(username:string, status:number):Observable<updateStatus>{
        return this.http.post<updateStatus>(`${environment.rootUrl}/change/AccountStatus`, {username, status}, this.httpOptions);
    }


}
