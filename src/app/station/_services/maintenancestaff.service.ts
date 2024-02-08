import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Maintenancestaff} from '../_model/maintenancestaff.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaintenancestaffService {
    getAllMaintenanceStaff() {
        throw new Error("Method not implemented.");
    }

  public maintenancestaff: Maintenancestaff[];

  private token: string = localStorage.getItem('token');
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            // 'Content-Type': 'application/json',
            Accept: 'application/json'
        })
    };
    maintenances: any;

  constructor(private http: HttpClient) { }

  getMantenanceStaffList() {
    return this.http.get<any>(
        `${environment.maintenanceStaffListUrl}/maintenancestafflist`,
        this.httpOptions
    );

}


addmaintenancestaff(maintensatff: Maintenancestaff): Observable<any> {
  return this.http
      .post<any>(`${environment.maintenanceStaffListUrl}/addmaintenancestaff`, maintensatff, this.httpOptions)
      .pipe(
          map(data => {
            //   console.log(data);
          })
      );
}  

}
