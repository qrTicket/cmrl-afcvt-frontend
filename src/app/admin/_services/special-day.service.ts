import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialDayService {
  addSpecialDayEndUrl:string = "api/v1/specialdays";
  getSpecialDayListEndUrl:string = "api/v1/specialdays";
  getSpecialDayByIdEndUrl:string = "api/v1/specialdays";
  updateSpecialDayByIdEndUrl:string = "api/v1/specialdays";
  getYearStartingDateEndUrl:string = "api/v1/calenderinfo";
  addYearStartingDateEndUrl:string = "api/v1/calenderinfo";
  updateYearStartingDateEndUrl:string = "api/v1/calenderinfo";

  constructor(
    private http:HttpClient
  ) { }

  addSpecialDay(payload: any):Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.addSpecialDayEndUrl}`,payload);
  }

  getSpecialDayList():Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getSpecialDayListEndUrl}`);
  }

  getSpecialDayById(id:number):Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getSpecialDayByIdEndUrl}/${id}`);
  }

  updateSpecialDayById(payload:any,id:number):Observable<any> {
    return this.http.put<any>(`${environment.BASEURL}/${this.updateSpecialDayByIdEndUrl}/${id}`,payload);
  }

  getYearStartingDate():Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getYearStartingDateEndUrl}`);
  }

  addYearStartingDate(payload: any):Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.addYearStartingDateEndUrl}`,payload);
  }

  updateStartOfCalander(payload:any):Observable<any> {
    return this.http.put<any>(`${environment.BASEURL}/${this.updateYearStartingDateEndUrl}`, payload);
  }
}
