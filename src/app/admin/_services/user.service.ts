// import { Injectable } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { Register } from '../../auth_models/register.model';
// @Injectable({
//     providedIn: 'root'
// })
// export class UserService {
//   getUser() {
//     throw new Error("Method not implemented.");
//   }
//         constructor(private http: HttpClient) {}
//     register(register: Register) {
//         return this.http.post(`${environment.rootUrl}/signup`, register);
//     }
//     getAll() {
//         return this.http.get<Register[]>(environment.rootUrl);
//     }
// }


import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { AuthService } from '../../_services/auth.service';
import { User } from '../_models/user.model';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // httpOptions: boolean;
    //   getUser() {
    //     throw new Error("Method not implemented.");
    //   }
    private token: string = localStorage.getItem('token');
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        })
    };

    options = {
        headers: this.httpOptions,
        crossDomain: true,
        withCredentials: true
    };

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    postAdduser(user: User) {
        return this.http.post<User>(
            `${environment.lineUrl}/usermanager/add`,
            user,
            this.httpOptions
        );
    }

    getUser() {
        return this.http.get<User>(
            `${environment.lineUrl}/usermanager/list`,
            this.httpOptions
        );
    }

    getUserById(id: number) {
        return this.http.get<User>(
            `${environment.lineUrl}/usermanager/${id}`,
            this.httpOptions
        );
    }

    putUser(id: number, user: User): Observable<User> {
        let userData = {
            id: user.id,
            name: user.name,
            designation: user.designation,
            empId: user.empId,
            username: user.username,
            contactNumber: user.contactNumber,
            email: user.email,
            address: user.address,
            createdDate: user.createdDate,
            modifiedDate: user.modifiedDate
        };
        return this.http.put<User>(
            `${environment.lineUrl}/usermanager/update/${id}`,
            userData,
            this.httpOptions
        );
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            //console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    // register(user: User) {
    //     return this.http.post(`${environment.lineUrl}/usermanager/add`, user);
    // }
    // getAll() {
    //     return this.http.get<User[]>(environment.rootUrl);
    // }


}