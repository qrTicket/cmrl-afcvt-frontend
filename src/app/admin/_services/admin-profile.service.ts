import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Profile } from '../../admin/_models/admin-profile.model';
import { map, catchError, tap } from 'rxjs/operators';
import { EditProfile } from 'src/app/_models/editProfile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private token: string = localStorage.getItem('token');

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    })
  };
  options = {
    headers: this.httpOptions,
    crossDomain: true,
    withCredentials: true
  };
  constructor(private http: HttpClient, private authService: AuthService) { }


  postEditprofile(profile: Profile): Observable<any> {
    return this.http
      .post<any>(`${environment.lineUrl}/`, profile, this.httpOptions)
      .pipe(
        map(data => {
          //console.log(data);
        })
      );
  }

 // url:String = "http://localhost:8080/api/auth";

  //edit admin profile details
  editAdminProfile(profile: EditProfile): Observable<EditProfile>{
    console.log("profile : "+ profile.name,profile.email,profile.mobileNumber);
    return this.http.post<EditProfile>(`${environment.rootUrl}/change/updateProfile`, profile)
  }

}


