import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, from } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Zone } from "../_models/zone.model";
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
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

  addZone(zone: Zone): Observable<any> {
    return this.http
      .post<any>(`${environment.lineUrl}/zone/add`, zone, this.httpOptions)
      .pipe(
        map(data => {
        })
      );
  }

  zoneList() {
    return this.http.get<any>(
      `${environment.lineUrl}/zone/list`,
      this.httpOptions
    );
  }
  
}
