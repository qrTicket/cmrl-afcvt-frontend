import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of, from } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { Zone } from "../_models/zone.model";
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  saveZoneEndUrl:any = "api/afc/zone/save";
  getAllZoneEndUrl:any = "api/afc/zone/all";
  getZoneByIdEndUrl:any = "api/afc/zone";
  updateZoneEndUrl:any = "api/afc/zone/update";


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

  //old (not used)
  addZone(zone: Zone): Observable<any> {
    return this.http
      .post<any>(`${environment.lineUrl}/zone/add`, zone, this.httpOptions)
      .pipe(
        map(data => {
        })
      );
  }

  //old (not used)
  zoneList() {
    return this.http.get<any>(
      `${environment.lineUrl}/zone/list`,
      this.httpOptions
    );
  }

  //add zone
  saveZone(payload:any): Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.saveZoneEndUrl}`, payload)
      
  }

  //add zone
  getAllZone(): Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getAllZoneEndUrl}`)
      
  }

  //get Zone By Id
  getZoneById(id:any): Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getZoneByIdEndUrl}/${id}`)
      
  }

  //Update Zone By Id
  updateZone(payload:any, id:any): Observable<any> {
    return this.http.put<any>(`${environment.BASEURL}/${this.updateZoneEndUrl}/${id}`,payload)
  }
  
  
}
