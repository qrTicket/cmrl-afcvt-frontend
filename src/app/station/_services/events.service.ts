import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

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

  private fetchData$: Observable<string> = this.getEvents();

  constructor(
    private http: HttpClient
  ) { }

  getEvents() {
    return this.http.get<any>(
      `${environment.productUrl}/event/all`,
      this.httpOptions
    );
  }

}
