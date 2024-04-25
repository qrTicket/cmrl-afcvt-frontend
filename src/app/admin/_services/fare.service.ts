import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Fare } from '../_models/fare.model';
import { Businessrule } from '../_models/businessrule.model';


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

    // fare details by id - Removed from backend
    getFareById(id: number) {
        return this.http.get<Fare>(
            `${environment.productUrl}/admin/trm/${id}`,
            this.httpOptions
        );
    }

    // update fare details - Removed from backend
    updateFareDetails(id: number, fare: Fare): Observable<Fare> {
        return this.http.put<Fare>(
            `${environment.productUrl}/admin/update/trm/${id}`,
            fare,
            this.httpOptions
        );
    }

    //NEW - to get business rule and terminal config
    getBusinessRule(){
        return this.http.get<any>(`${environment.productUrl}/admin/trm`);
    }

    // update business rule
    updateFareDetails1(payload: Businessrule): Observable<any> {
        return this.http.put<any>(`${environment.productUrl}/admin/update/trm/`,payload);
    }

    

    
   

}


