import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { interval } from "rxjs";
import { Subscription } from "rxjs";
import { environment } from "../../../environments/environment";
@Injectable({
    providedIn: "root",
})
export class GeneralmsgService {
   
    private token: string = localStorage.getItem("token");
    headers = new HttpHeaders().set("Content-Type", "application/json");
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

    private fetchData$: Observable<string> = this.getGeneralMsg();
    constructor(private http: HttpClient) {
        // this.subscriptions.push(
        //     interval(1000).subscribe((res) => {
        //         this.getGeneralMsg();
        //         // console.log(res);
                
        //     })
        // );
    }

    getGeneralMsg() {
        return this.http.get<any>(
            `${environment.productUrl}/generalmessage/event`,
            this.httpOptions
        );
    }
}
