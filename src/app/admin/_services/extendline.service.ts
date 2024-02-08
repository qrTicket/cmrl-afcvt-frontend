import { Injectable, Pipe } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Extend } from '../_models/extendline.model';
import { Line } from '../_models/lines.model';
import { Station } from '../_models/station.model';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})

export class ExtendlineService {
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
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  postExtendline(extend: Extend) {
    return this.http.post<Extend>(
      `${environment.lineUrl}/lineextension/add`,
      extend,
      this.httpOptions
    );
  }

  getExtendlist() {
    return this.http.get<any>(
      `${environment.lineUrl}/lineextension/list`,
      this.httpOptions
    );
  }

  getExtendLineById(id: number) {
    return this.http.get<Line>(
      `${environment.lineUrl}/lineextension/${id}`,
      this.httpOptions
    );
  }

}