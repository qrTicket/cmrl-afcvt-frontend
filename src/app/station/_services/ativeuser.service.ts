import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../../_services/auth.service';
import { timer, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtiveuserService {

  private token: string = localStorage.getItem('token');
  headers = new HttpHeaders().set("Content-Type", "application/json");
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

  private fetchData$: Observable<string> = this.getactiveuser();

  constructor(private http: HttpClient, private authService: AuthService) { }

  getactiveuser() {
    return this.http.get<any>(
      `${environment.userlist}`,
      this.httpOptions
    );
  }
}
