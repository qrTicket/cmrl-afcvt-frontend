import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AddUsermanager } from '../_models/add-usermanager.model';
import { UpdateUsermanager } from '../_models/update-usermanager.model';



@Injectable({
  providedIn: 'root'
})
export class AddUsermanagerService {

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

  getAllRoles() {
      return this.http.get(`${environment.rootUrl}/list/roles/adm`);
  }

  addUser(addUser: AddUsermanager): Observable<AddUsermanager> {
      return this.http.post<AddUsermanager>(
          `${environment.rootUrl}/createUSM`,
          addUser,
          this.httpOptions
      );
  }
  ///list/usermanager/0
  userList() {
      return this.http.get<AddUsermanager[]>(
          `${environment.rootUrl}/list/users/foradmin`,
          this.httpOptions
      );
  }

    // User count
userCount() {
    return this.http.get<AddUsermanager[]>(
        `${environment.rootUrl}/user/count`,
        this.httpOptions
    );
}

  getUserById(id) {
      return this.http.get<AddUsermanager>(
          `${environment.rootUrl}/user/${id}`,
          this.httpOptions
      );
  }

  //Admin will update USM details
  updateUser(payload: UpdateUsermanager ): Observable<UpdateUsermanager> {
      console.log("payload data => "+payload.username, payload.name, payload.empId, payload.email, payload.mobileNumber);
      console.log(payload);
      return this.http.post<UpdateUsermanager>(
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

  //Not in use
  /*getAllStation() {
      return this.http.get(`${environment.productUrl}/station/notall`, this.httpOptions);
      // .pipe( map(
      //     data => {
      //         return data["data"].filter(s => s.stationCode !== "ALL" )
      //     }    
      // ));
  }*/

  // edit-profile - admin // working
  getUserProfile() {
      return this.http.get(
          `${environment.rootUrl}/profile`,
          this.httpOptions
      );
  }



  getUserUpdateData(user){
      this.userData = user;
  }

  //edit User Manager Profile
  editUserManagerProfile(){
      
  }

  statusUpdate(username:string, status:number):Observable<any>{
      return this.http.post<any>(`${environment.rootUrl}/change/AccountStatus`, {username:username, status:status}, this.httpOptions);
  }
}
