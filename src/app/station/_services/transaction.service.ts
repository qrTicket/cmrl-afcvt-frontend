import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

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

  private fetchData$: Observable<string> = this.gettransaction();
  constructor(private http: HttpClient, private authService: AuthService) { }

  gettransaction() {
    return this.http.get<any>(
      `${environment.productUrl}/transaction/all`,
      this.httpOptions
    );
  }

}
