import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { changePassword } from '../_models/changepassworddata.model';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ChangeFirstPasswordService {

  constructor(
    private http: HttpClient
  ) { }

  handleError(error: any) {
    console.log(error);
    return throwError(error);
}

  changeFirstPassword(setNewPassword: changePassword){
    return this.http.post<any>(`${environment.rootUrl}/user/change/password`, setNewPassword).pipe(map(()=>setNewPassword),catchError(this.handleError));
  }
}
