import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
  addTimeTableEndUrl:string = "api/v1/timeslot";
  getTimeTableListEndUrl:string = "api/v1/timeslot";
  getTimeTableByIdEndUrl:string = "api/v1/timeslot";
  updateTimeTableByIdEndUrl:string = "api/v1/timeslot";
  changeStatusByIdEndUrl:string = "api/v1/timeslot";
  getActiveTimeSlotEndUrl:string = "api/v1/timeslot/active";
  mapDayTypeToTimeSlotEndUrl:string = "api/v1/daytype";
  updateDayTypeToTimeSlotMappingByIdEndUrl:string = "api/v1/daytype";
  getDayTypeToTimeSlotMappingDataByIdEndUrl:string = "api/v1/timetable";

  constructor(
    private http:HttpClient
  ) { }
  //TimeTable name changed to TimeSlot
  addTimeTable(payload: any):Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.addTimeTableEndUrl}`,payload);
  }

  //get both (Active and Inactive) time slot list
  getTimeTableList():Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getTimeTableListEndUrl}`);
  }

  //get Active time slot list
  getActiveTimeSlotList():Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getActiveTimeSlotEndUrl}`);
  }

  getTimeTableById(id:number):Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getTimeTableByIdEndUrl}/${id}`);
  }

  updateTimeTableById(payload:any,id:number):Observable<any> {
    return this.http.put<any>(`${environment.BASEURL}/${this.updateTimeTableByIdEndUrl}/${id}`,payload);
  }

  changeStatus(statusPayload:any, id:number):Observable<any>{
    return this.http.put<any>(`${environment.BASEURL}/${this.changeStatusByIdEndUrl}/${id}/status`,statusPayload);
  }

  mapDayTypeToTimeSlot(payload:any, id:number):Observable<any>{
    return this.http.post<any>(`${environment.BASEURL}/${this.mapDayTypeToTimeSlotEndUrl}/${id}/timetable`,payload);
  }

  getDayTypeToTimeSlotMappingDataById(id:number):Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getDayTypeToTimeSlotMappingDataByIdEndUrl}/${id}`);
  }

  updateDayTypeToTimeSlotMappingById(payload:any,id:number):Observable<any> {
    return this.http.put<any>(`${environment.BASEURL}/${this.updateDayTypeToTimeSlotMappingByIdEndUrl}/${id}/timetable`,payload);
  }
}
