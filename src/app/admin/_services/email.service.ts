import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Email } from '../_models/email.model';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    private token: string = localStorage.getItem('token');
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            // 'Content-Type': 'application/json',
            Accept: 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    sendMail(emailform: Email): Observable<any> {
        return this.http.post<any>(
            `${environment.mailUrl}`, emailform,
            this.httpOptions
        );
    }
    
    
}
