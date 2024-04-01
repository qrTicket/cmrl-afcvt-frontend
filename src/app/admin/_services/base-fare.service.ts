import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseFareService {
  addBaseFareEndUrl:string = "api/v1/basefare";
  getBaseFareListEndUrl:string = "api/v1/basefare";
  getBaseFareByIdEndUrl:string = "api/v1/basefare";
  updateBaseFareByIdEndUrl:string = "api/v1/basefare";

  constructor(
    private http:HttpClient
  ) { }

  addBaseFare(payload: any):Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/${this.addBaseFareEndUrl}`,payload);
  }

  getBaseFareList():Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getBaseFareListEndUrl}`);
  }

  getBaseFareById(id:number):Observable<any> {
    return this.http.get<any>(`${environment.BASEURL}/${this.getBaseFareByIdEndUrl}/${id}`);
  }

  updateBaseFareById(payload:any,id:number):Observable<any> {
    return this.http.put<any>(`${environment.BASEURL}/${this.updateBaseFareByIdEndUrl}/${id}`,payload);
  }
}
