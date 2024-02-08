import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Register } from '../auth_models/register.model';
@Injectable({
    providedIn: 'root'
})
export class UserService {
        constructor(private http: HttpClient) {}
    register(register: Register) {
        return this.http.post(`${environment.rootUrl}/signup`, register);
    }
    getAll() {
        return this.http.get<Register[]>(environment.rootUrl);
    }
}
