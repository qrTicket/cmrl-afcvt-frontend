import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { Terminal } from "../_models/terminal.model";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class TerminalService {
    constructor(private http: HttpClient) {}
    private token: string = localStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }),
    };

    addTerminal(payload: Terminal): Observable<Terminal> {
        return this.http.post<Terminal>(
            `${environment.terminalUrl}/add`,
            payload,
            this.httpOptions
        );
    }
    getTerminalList() {
        return this.http.get<Terminal[]>(
            `${environment.terminalUrl}/allterminal`,
            this.httpOptions
        );
    }
}
