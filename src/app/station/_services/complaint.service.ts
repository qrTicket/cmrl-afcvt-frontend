import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Sentcomplaint } from '../_model/sentcomplaint.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
// import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  formData: Sentcomplaint;
  // readonly rootURL = "http://localhost:8080/api"
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

  constructor(private http: HttpClient, private authService: AuthService) { }

  postComplaint(complaint: Sentcomplaint): Observable<any> {
    return this.http
      .post<any>(`${environment.productUrl}/complaint/add`,
      complaint, 
      this.httpOptions
      );
  }

  getComplaintStatus() {
    return this.http.get<any>(
      `${environment.productUrl}/complaints/station`,
      this.httpOptions
    );
  }

  getComplaintDetails(token) {
    return this.http.get<any>(
      `${environment.productUrl}/Complaint/get/${token}`,
      this.httpOptions
    );
  }

  getDeviceDetails(deviceid) {
    return this.http.get<any>(
      `${environment.productUrl}/equipment/get/${deviceid}`,
      this.httpOptions
    );
  }

  getAllComplaints() {
    return this.http.get<any>(
      `${environment.complainListUrl}/complaint`,
      this.httpOptions
    );
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
