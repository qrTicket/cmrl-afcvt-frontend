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

    postAddline(line: Line): Observable<any> {
        return this.http.post<any>(
            `${environment.productUrl}/line/save`,
            line,
            this.httpOptions
        );
    }

    getLines() {
        return this.http.get<any>(
            `${environment.productUrl}/line/all`,
            this.httpOptions
        );
    }

    getLineById(id: number) {
        return this.http.get<Line>(
            `${environment.productUrl}/line/${id}`,
            this.httpOptions
        );
    }

    putLine(line: Line): Observable<Line> {
        return this.http.put<Line>(
            `${environment.productUrl}/line/update`,
            line,
            this.httpOptions
        );
    }

    statusUpdate(linecode:string,status:number){
        return this.http.get<any>(
            `${environment.productUrl}/change/status/line/${linecode}/${status}`,
            this.httpOptions
        );
    }
}
