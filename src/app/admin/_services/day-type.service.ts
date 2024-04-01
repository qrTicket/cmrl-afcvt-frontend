import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayTypeService {
  addDayTypeEndUrl:string = "api/v1/daytype";
  getDayTypeListEndUrl:string = "api/v1/daytype";
  getDayTypeByIdEndUrl:string = "api/v1/daytype";
  updateDayTypeByIdEndUrl:string = "api/v1/daytype";
  getActiveDayTypeEndUrl:string = "api/v1/daytype/active";
  changeStatusByIdEndUrl:string = "api/v1/daytype";

  constructor(
    private http:HttpClient
  ) { }

  addDayType(payload: any):Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.addDayTypeEndUrl}`,payload);
  }

  //get both (Active and Inactive) day type list
  getDayTypeList():Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getDayTypeListEndUrl}`);
  }

  //get active day type list
  getActiveDayTypeList():Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getActiveDayTypeEndUrl}`);
  }

  getDayTypeById(id:number):Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getDayTypeByIdEndUrl}/${id}`);
  }

  updateDayTypeById(payload:any,id:number):Observable<any> {
    return this.http.put<any>(`${environment.BASEURL}/${this.updateDayTypeByIdEndUrl}/${id}`,payload);
  }

  changeStatus(statusPayload:any, id:number):Observable<any>{
    return this.http.put<any>(`${environment.BASEURL}/${this.changeStatusByIdEndUrl}/${id}/status`,statusPayload);
  }
}
