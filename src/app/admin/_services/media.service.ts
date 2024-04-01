import { Injectable } from '@angular/core';
import { AddMedia } from '../_models/addMediaType';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  addMediaTypeEndUrl:string = "api/v1/mediatype";
  mediaTypeListEndUrl:string = "api/v1/mediatype";
  getMediaTypeByIdEndUrl:string = "api/v1/mediatype";
  updateMediaTypeByIdEndUrl:string = "api/v1/mediatype";
  changeStatusByIdEndUrl:string = "api/v1/mediatype";
  //mapMediaTicketEndUrl:string = "api/v1/mediatype";
  mapMediaTicketEndUrl:string = "api/v1/mediatype/map";
  getActiveMediaTypeListEndUrl:string = "api/v1/mediatype/active";
  getMediaTicketToTicketSubTypeListEndUrl:string = "api/v1/mediatype/map";

  constructor(private http: HttpClient) { }

addMedia(payload: any):Observable<AddMedia> {
  return this.http.post<AddMedia>(`${environment.BASEURL}/${this.addMediaTypeEndUrl}`,payload);
}

getMediaTypeList():Observable<any> {
  return this.http.get<any>(`${environment.BASEURL}/${this.mediaTypeListEndUrl}`);
}

getActiveMediaTypeList():Observable<any> {
  return this.http.get<any>(`${environment.BASEURL}/${this.getActiveMediaTypeListEndUrl}`);
}

getMediaTypeById(id:number):Observable<any> {
  return this.http.get<any>(`${environment.BASEURL}/${this.getMediaTypeByIdEndUrl}/${id}`);
}

updateMediaTypeById(payload:any,id:number):Observable<any> {
  return this.http.put<any>(`${environment.BASEURL}/${this.updateMediaTypeByIdEndUrl}/${id}`,payload);
}

changeStatus(statusPayload:any, id:number):Observable<any>{
  return this.http.put<any>(`${environment.BASEURL}/${this.changeStatusByIdEndUrl}/${id}/status`,statusPayload);
}

// mapMediaTicket(payload:any, id:any):Observable<any>{
//   return this.http.put<any>(`${environment.BASEURL}/${this.mapMediaTicketEndUrl}/${id}/tickettype`,payload);
// }

mapMediaTicket(payload:any):Observable<any>{
  return this.http.post<any>(`${environment.BASEURL}/${this.mapMediaTicketEndUrl}`,payload);
}

getMediaTicketToTicketSubTypeList():Observable<any> {
  return this.http.get<any>(`${environment.BASEURL}/${this.getMediaTicketToTicketSubTypeListEndUrl}`);
}


}
