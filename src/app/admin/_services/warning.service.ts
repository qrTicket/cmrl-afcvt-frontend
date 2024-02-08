import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Warning } from '../_models/warning.model';
import { AuthService } from 'src/app/_services';

@Injectable({
    providedIn: 'root'
})
export class WarningService {
    
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

    classificationList() {
        return this.http.get<any>(
            `${environment.lineUrl}/alarmClassification/list`,
            this.httpOptions
        );
    }
}