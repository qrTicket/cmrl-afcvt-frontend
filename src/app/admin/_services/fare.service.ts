import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Fare } from '../_models/fare.model';


@Injectable({
    providedIn: 'root'
})
export class FareService {

   

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

    // get fare list
    getFareList() {
        return this.http.get<any>(
            `${environment.productUrl}/admin/trms`,
            this.httpOptions
        );
    }

    // fare details by id
    getFareById(id: number) {
        return this.http.get<Fare>(
            `${environment.productUrl}/admin/trm/${id}`,
            this.httpOptions
        );
    }

    // update fare details
    updateFareDetails(id: number, fare: Fare): Observable<Fare> {
        return this.http.put<Fare>(
            `${environment.productUrl}/admin/update/trm/${id}`,
            fare,
            this.httpOptions
        );
    }

    
   

}


