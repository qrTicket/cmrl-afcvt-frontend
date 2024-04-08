import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { AuthService } from "../../_services/auth.service";
import { Line } from "../_models/lines.model";
// import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: "root",
})
export class LinesService {
    private token: string = localStorage.getItem("token");

    addLineEndUrl:string = "api/afc/line/save";
    getLineEndUrl:string = "api/afc/line/all";
    getLinByIdEndUrl:string = "api/afc/line"
    updateLineEndUrl:string = "api/afc/line/update";
    updateStatusEndUrl:string = "change/status/line";

    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }),
    };
    options = {
        headers: this.httpOptions,
        crossDomain: true,
        withCredentials: true,
    };
    constructor(private http: HttpClient, private authService: AuthService) {}

    postAddline(payload: any): Observable<any> {
        return this.http.post<any>(`${environment.BASEURL}/${this.addLineEndUrl}`,payload,this.httpOptions);
    }

    getLines() {
        return this.http.get<any>(`${environment.BASEURL}/${this.getLineEndUrl}`,this.httpOptions);
    }

    getLineById(id: number) {
        return this.http.get<Line>(`${environment.BASEURL}/${this.getLinByIdEndUrl}/${id}`,this.httpOptions);
    }

    putLine(payload: any, lineId:number): Observable<any> {
        return this.http.put<Line>(`${environment.BASEURL}/${this.updateLineEndUrl}/${lineId}`, payload, this.httpOptions);
    }

    statusUpdate(linecode:string,status:number){
        return this.http.get<any>(`${environment.productUrl}/${this.updateStatusEndUrl}/${linecode}/${status}`,this.httpOptions);
    }
}
