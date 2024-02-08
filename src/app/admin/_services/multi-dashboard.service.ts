import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, from } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Multidashboard } from "../_models/multi-dashboard.model";
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MultiDashboardService {
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

  addDashboard(multidashboard: Multidashboard): Observable<any> {
    return this.http
      .post<any>
      (`${environment.lineUrl}/dashboard/add`, 
      multidashboard, 
      this.httpOptions)
      .pipe(
        map(data => {
          console.log(data);
        })
      );
  }

  dashboardList() {
    return this.http.get<any>(
      `${environment.lineUrl}/dashboard/list`,
      this.httpOptions
    );
  }

}
