import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError, from } from 'rxjs';
import { environment} from '../../../environments/environment';
import { map,catchError } from 'rxjs/operators';
import { AuthService } from '../../_services/auth.service';
import { timer,  Subject } from 'rxjs';
import { switchMap, takeUntil  } from 'rxjs/operators';
import { Alarm } from '../_models/alarm.model';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  // readonly rootURL ="http://localhost:8080/api"
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

private fetchData$: Observable<string> = this.getAllalarm();
  constructor(private http: HttpClient,  private authService: AuthService) { }

  getAllalarm() {
    return this.http.get<any>(
        `${environment.alarmUrl}`,
        this.httpOptions
    );
}

}
