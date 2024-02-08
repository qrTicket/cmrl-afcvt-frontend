import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

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
  constructor(
    private http: HttpClient
  ) { }

  getAllalarm() {
    return this.http.get<any>(
      `${environment.productUrl}/alarm/generated/all`,
      this.httpOptions
    );
  }

  getAlarmGeneratedDescription() {
    return this.http.get<any>(
      `${environment.productUrl}/alarm/description/all`,
      this.httpOptions
    );
  }

}
