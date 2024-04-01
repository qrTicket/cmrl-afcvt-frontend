import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  addTicketTypeEndUrl:string = "api/v1/tickettype";
  getTicketTypeListEndUrl:string = "api/v1/tickettype";
  getTicketTypeByIdEndUrl:string = "api/v1/tickettype";
  updateTicketTypeByIdEndUrl:string = "api/v1/tickettype";
  changeStatusByIdEndUrl:string = "api/v1/tickettype";

  addTicketSubTypeEndUrl:string = "api/v1/ticketsubtype";
  getTicketSubTypeListEndUrl:string = "api/v1/ticketsubtype";
  getTicketSubTypeByIdEndUrl:string = "api/v1/ticketsubtype";
  updateTicketSubTypeByIdEndUrl:string = "api/v1/ticketsubtype";
  

  constructor(
    private http:HttpClient
  ) { }

  addTicket(payload: any):Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.addTicketTypeEndUrl}`,payload);
  }

  getTicketTypeList():Observable<any> {
      return this.http.get<any>(`${environment.BASEURL}/${this.getTicketTypeListEndUrl}`);
  }

  getTicketTypeById(id:number):Observable<any> {
      return this.http.get<any>(`${environment.BASEURL}/${this.getTicketTypeByIdEndUrl}/${id}`);
  }

  updateTicketTypeById(payload:any,id:number):Observable<any> {
      return this.http.put<any>(`${environment.BASEURL}/${this.updateTicketTypeByIdEndUrl}/${id}`,payload);
  }

  addTicketSubType(payload: any):Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.addTicketSubTypeEndUrl}`,payload);
  }

  getTicketSubTypeList():Observable<any> {
      return this.http.get<any>(`${environment.BASEURL}/${this.getTicketSubTypeListEndUrl}`);
  }

  getTicketSubTypeById(id:number):Observable<any> {
      return this.http.get<any>(`${environment.BASEURL}/${this.getTicketSubTypeByIdEndUrl}/${id}`);
  }

  updateTicketSubTypeById(payload:any,id:number):Observable<any> {
      return this.http.put<any>(`${environment.BASEURL}/${this.updateTicketSubTypeByIdEndUrl}/${id}`,payload);
  }

  changeStatus(statusPayload:any, id:number):Observable<any>{
    return this.http.put<any>(`${environment.BASEURL}/${this.changeStatusByIdEndUrl}/${id}/status`,statusPayload);
  }
}
